import React, { FunctionComponent } from 'react';
import { Space, Checkbox, Button } from 'antd';
import 'antd/dist/antd.css';
import { useBoolean } from '@qiaoyuwen-core-next/react-hooks';

const Component: FunctionComponent = () => {
  const [checked, { setTrue, setFalse, toggle }] = useBoolean(false);

  return (
    <>
      <Space direction="vertical">
        <Space>
          <Checkbox checked={checked}>单选框</Checkbox>
        </Space>
        <Space>
          <Button type="primary" onClick={setTrue}>
            setTrue
          </Button>
          <Button type="primary" onClick={setFalse}>
            setFalse
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
