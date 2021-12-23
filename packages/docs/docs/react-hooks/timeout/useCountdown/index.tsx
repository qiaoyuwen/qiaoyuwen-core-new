import React, { FunctionComponent } from 'react';
import 'antd/dist/antd.css';
import { useCountdown } from '@qiaoyuwen-core/react-hooks';
import { Button, Space } from 'antd';

const Component: FunctionComponent = () => {
  const [countdown, start, pause, reset] = useCountdown(60 * 1000, 1 * 1000);

  return (
    <>
      <Space direction="vertical">
        <span>倒计时: {countdown / 1000}s</span>
        <Space>
          <Button type="primary" onClick={() => start()}>
            开始
          </Button>
          <Button type="primary" onClick={() => pause()}>
            暂停
          </Button>
          <Button type="primary" onClick={() => reset()}>
            重置
          </Button>
        </Space>
      </Space>
    </>
  );
};

export default Component;
