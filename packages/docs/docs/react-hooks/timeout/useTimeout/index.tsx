import React, { FunctionComponent } from 'react';
import { useState } from 'react';
import 'antd/dist/antd.css';
import { useTimeout } from '@qiaoyuwen-core-next/react-hooks';

const Component: FunctionComponent = () => {
  const [color, setColor] = useState('red');
  useTimeout(() => {
    setColor('green');
  }, 2000);

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: 100,
          height: 100,
          backgroundColor: color,
        }}
      >
        <span style={{ color: '#fff' }}>2秒后变为绿色</span>
      </div>
    </>
  );
};

export default Component;
