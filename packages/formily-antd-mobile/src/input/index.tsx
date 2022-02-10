import React from 'react';
import { connect, mapProps } from '@formily/react';
import { Input as AntdMobileInput } from 'antd-mobile';
import { InputProps } from 'antd-mobile/es/components/input';

export const Input: React.FC<InputProps> = connect(
  AntdMobileInput,
  mapProps((props) => {
    return {
      ...props,
    };
  }),
);

export default Input;
