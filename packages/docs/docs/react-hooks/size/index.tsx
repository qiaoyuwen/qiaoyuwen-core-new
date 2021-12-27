/**
 * title: 使用ref监听元素尺寸变化
 */

import React, { FunctionComponent, useRef } from 'react';
import { Space } from 'antd';
import 'antd/dist/antd.css';
import { useSize } from '@qiaoyuwen-core-next/react-hooks';

const Component: FunctionComponent = () => {
  const elRef = useRef(null);
  const size = useSize(elRef);

  return (
    <>
      <Space direction="vertical">
        <Space>
          <span>宽: {size.width}</span>
          <span>高: {size.height}</span>
        </Space>
        <textarea ref={elRef} />
      </Space>
    </>
  );
};

export default Component;
