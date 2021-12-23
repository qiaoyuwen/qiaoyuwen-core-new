/**
 * title: 使用react-beautiful-dnd实现可拖拽虚拟列表
 */

/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/typedef */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import React, { useCallback, FunctionComponent } from 'react';
import { useState } from 'react';
import { Button, Space, InputNumber } from 'antd';
import 'antd/dist/antd.css';
import { useVirtualList } from '@qiaoyuwen-core/react-hooks';
import type { DropResult } from 'react-beautiful-dnd';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { DragOutlined } from '@ant-design/icons';

const getItems = (length: number = 10000): string[] => {
  return Array.from({ length }).map((_, index) => `${index + 1}`);
};

function getStyle({ provided, style, isDragging }: any) {
  // If you don't want any spacing between your items
  // then you could just return this.
  // I do a little bit of magic to have some nice visual space
  // between the row items
  const combined = {
    ...style,
    ...provided.draggableProps.style,
  };

  const marginBottom = 8;
  const withSpacing = {
    ...combined,
    height: isDragging ? combined.height : combined.height - marginBottom,
    marginBottom,
  };
  return withSpacing;
}

function Item({ provided, item, style, isDragging }: any) {
  return (
    <div
      {...provided.draggableProps}
      ref={provided.innerRef}
      style={getStyle({ provided, style, isDragging })}
      className={`item ${isDragging ? 'is-dragging' : ''}`}
    >
      Item: {item.data}
      <div style={{ marginLeft: 24 }} {...provided.dragHandleProps}>
        <DragOutlined />
      </div>
    </div>
  );
}

const Component: FunctionComponent = () => {
  const [items, setItems] = useState(getItems());
  const [value, setValue] = useState<number>(1000);
  const { list, containerProps, scrollTo } = useVirtualList(items, {
    itemHeight: 50,
  });

  const onChange = useCallback((changeValue: number) => setValue(changeValue), []);

  const onDragEnd = useCallback(
    ({ source, destination }: DropResult) => {
      if (!destination) {
        return;
      }
      const curRow = items.splice(source.index, 1)[0];
      items.splice(destination.index, 0, curRow);
      setItems([...items]);
    },
    [items],
  );

  return (
    <>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Space>
          <InputNumber min={1} max={10000} defaultValue={value} onChange={onChange} />
          <Button onClick={() => scrollTo(value - 1)}>滚动</Button>
        </Space>
        <DragDropContext onDragEnd={onDragEnd}>
          <div {...(containerProps as any)} style={{ height: '300px', overflow: 'auto' }}>
            <Droppable
              droppableId="droppable"
              mode="virtual"
              renderClone={(provided, snapshot, rubric) => {
                return (
                  <Item
                    provided={provided}
                    isDragging={snapshot.isDragging}
                    item={{ data: items[rubric.source.index], index: rubric.source.index }}
                    style={{
                      height: 50,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      border: '1px solid red',
                    }}
                  />
                );
              }}
            >
              {(provided) => (
                <div ref={provided.innerRef} style={{ width: '100%', height: '500000px', position: 'relative' }}>
                  {list.map((item) => (
                    <Draggable draggableId={item.data} index={item.index} key={item.data}>
                      {(dragProvided) => (
                        <Item
                          provided={dragProvided}
                          item={item}
                          style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            top: item.index * 50,
                            height: 50,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #e8e8e8',
                          }}
                          isDragging={false}
                        />
                      )}
                    </Draggable>
                  ))}
                </div>
              )}
            </Droppable>
          </div>
        </DragDropContext>
      </Space>
    </>
  );
};

export default Component;
