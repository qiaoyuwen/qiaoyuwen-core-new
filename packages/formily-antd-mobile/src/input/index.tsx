import { FunctionComponent } from 'react';
import { connect } from '@formily/react';
import { Input as AntdMobileInput } from 'antd-mobile';
import { InputProps } from 'antd-mobile/es/components/input';

export const Input: FunctionComponent<InputProps> = connect(AntdMobileInput);

export default Input;
