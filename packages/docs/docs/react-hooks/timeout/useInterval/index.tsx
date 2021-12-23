import React, { FunctionComponent, useState } from 'react';
import 'antd/dist/antd.css';
import { useInterval } from '@qiaoyuwen-core/react-hooks';

const Component: FunctionComponent = () => {
  const [count, setCount] = useState(0);

  useInterval(() => {
    setCount((origin) => origin + 1);
  }, 1000);

  return (
    <>
      <span>count每秒加1: {count}</span>
    </>
  );
};

export default Component;
