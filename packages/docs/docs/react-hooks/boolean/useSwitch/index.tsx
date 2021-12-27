import React, { FunctionComponent } from 'react';
import { Space, Switch, Button } from 'antd';
import 'antd/dist/antd.css';
import { useSwitch } from '@qiaoyuwen-core-next/react-hooks';

const Component: FunctionComponent = () => {
  const [checked, { on, off, toggle }] = useSwitch(false);

  return (
    <>
      <Space direction="vertical">
        <Space>
          <Switch checked={checked} />
        </Space>
        <Space>
          <Button type="primary" onClick={on}>
            on
          </Button>
          <Button type="primary" onClick={off}>
            off
          </Button>
          <Button type="primary" onClick={toggle}>
            toggle
          </Button>
        </Space>
      </Space>
    </>
  );
};

export default Component;
