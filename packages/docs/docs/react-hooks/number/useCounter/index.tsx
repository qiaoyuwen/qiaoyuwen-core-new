import React, { FunctionComponent, useCallback } from 'react';
import { Space, Button, InputNumber } from 'antd';
import 'antd/dist/antd.css';
import { useCounter } from '@qiaoyuwen-core-next/react-hooks';

const Component: FunctionComponent = () => {
  const [count, { inc, dec, reset }] = useCounter(0, {
    min: 0,
    max: 10,
  });

  const onResetClick = useCallback(() => {
    reset(0);
  }, [reset]);

  return (
    <>
      <Space direction="vertical">
        <InputNumber min={0} max={10} value={count} />
        <Space>
          <Button type="primary" onClick={inc}>
            inc
          </Button>
          <Button type="primary" onClick={dec}>
            dec
          </Button>
          <Button type="primary" onClick={onResetClick}>
            reset
          </Button>
        </Space>
      </Space>
    </>
  );
};

export default Component;
