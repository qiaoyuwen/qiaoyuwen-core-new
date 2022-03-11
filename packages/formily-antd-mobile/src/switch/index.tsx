import { FunctionComponent } from 'react';
import { Switch as AntdMobileSwitch } from 'antd-mobile';
import { connect, mapProps } from '@formily/react';
import { SwitchProps } from 'antd-mobile/es/components/switch';

export const Switch: FunctionComponent<SwitchProps> = connect(
  AntdMobileSwitch,
  mapProps({
    value: 'checked',
  }),
);

export default Switch;
