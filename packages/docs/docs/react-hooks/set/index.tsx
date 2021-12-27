import React, { FunctionComponent } from 'react';
import { Space, Button, List } from 'antd';
import 'antd/dist/antd.css';
import { useSet } from '@qiaoyuwen-core-next/react-hooks';

const Component: FunctionComponent = () => {
  const [data, { add, remove, clear }] = useSet<string>([]);

  return (
    <>
      <Space direction="vertical">
        <List
          dataSource={Array.from(data)}
          renderItem={(item) => (
            <List.Item>
              <span style={{ width: 250 }}>{item}</span>
              <Button type="primary" danger onClick={() => remove(item)}>
                删除
              </Button>
            </List.Item>
          )}
        />
        <Space>
          <Button type="primary" onClick={() => add(`${Math.random()}`)}>
            添加
          </Button>
          <Button type="primary" onClick={() => clear()}>
            清空
          </Button>
        </Space>
      </Space>
    </>
  );
};

export default Component;
