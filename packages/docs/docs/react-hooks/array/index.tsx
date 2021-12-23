import React, { FunctionComponent, useCallback } from 'react';
import { Space, Button, List } from 'antd';
import { useArray } from '@qiaoyuwen-core/react-hooks';
import 'antd/dist/antd.css';

const Component: FunctionComponent = () => {
  const [data, { push, remove, reverse }] = useArray<string>([]);

  const onRemoveClick = useCallback(
    (item) => {
      remove(item);
    },
    [remove],
  );

  const onPushClick = useCallback(() => {
    push(`${Math.random()}`);
  }, []);

  const onReverseClick = useCallback(() => {
    reverse();
  }, []);

  const renderItem = useCallback((item: string) => {
    return (
      <List.Item>
        <span style={{ width: 250 }}>{item}</span>
        <Button type="primary" danger onClick={onRemoveClick}>
          删除
        </Button>
      </List.Item>
    );
  }, []);

  return (
    <>
      <Space direction="vertical">
        <List dataSource={data} renderItem={renderItem} />
        <Space>
          <Button type="primary" onClick={onPushClick}>
            添加
          </Button>
          <Button type="primary" onClick={onReverseClick}>
            反转
          </Button>
        </Space>
      </Space>
    </>
  );
};

export default Component;
