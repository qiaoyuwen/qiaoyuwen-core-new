/**
 * title: 渲染大量的数据
 */

/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useCallback, FunctionComponent } from 'react';
import { useState } from 'react';
import { Button, Space, InputNumber } from 'antd';
import 'antd/dist/antd.css';
import { useVirtualList } from '@qiaoyuwen-core/react-hooks';

const getItems = (length: number = 10000): string[] => {
  return Array.from({ length }).map((_, index) => `${index + 1}`);
};

const Component: FunctionComponent = () => {
  const items = getItems();
  const [value, setValue] = useState<number>(1000);
  const { list, containerProps, wrapperProps, scrollTo } = useVirtualList(items, {
    itemHeight: 60,
  });

  const onChange = useCallback((changeValue: number) => setValue(changeValue), []);

  return (
    <>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Space>
          <InputNumber min={1} max={10000} defaultValue={value} onChange={onChange} />
          <Button onClick={() => scrollTo(value - 1)}>滚动</Button>
        </Space>
        <div {...containerProps} style={{ height: '300px', overflow: 'auto' }}>
          <div {...wrapperProps}>
            {list.map((item) => (
              <div
                style={{
                  height: 50,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  border: '1px solid #e8e8e8',
                  marginBottom: 10,
                }}
                key={item.index}
              >
                Item: {item.data}
              </div>
            ))}
          </div>
        </div>
      </Space>
    </>
  );
};

export default Component;
