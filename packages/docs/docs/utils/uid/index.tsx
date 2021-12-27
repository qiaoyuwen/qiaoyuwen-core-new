import React, { useCallback, FunctionComponent, useState } from 'react';
import { Button, Space } from 'antd';
import { uid } from '@qiaoyuwen-core-next/utils';
import 'antd/dist/antd.css';

const Demo: FunctionComponent = () => {
  const [result, setResult] = useState('');

  const getUid = useCallback(() => {
    setResult(uid());
  }, []);

  return (
    <>
      <Space>
        <Button type="primary" onClick={getUid}>
          生成uid
        </Button>
        <span>{result}</span>
      </Space>
    </>
  );
};

export default Demo;
