import { connect, mapProps } from '@formily/react';
import { Radio as AntdMobileRadio, Space } from 'antd-mobile';
import { RadioGroupProps, RadioProps } from 'antd-mobile/es/components/radio';
import { FunctionComponent } from 'react';

type ComposedRadio = FunctionComponent<RadioProps> & {
  Group?: React.FC<RadioGroupProps>;
  __ANT_MOBILE_RADIO?: boolean;
};

export const Radio: ComposedRadio = connect(
  AntdMobileRadio,
  mapProps({
    value: 'checked',
    onInput: 'onChange',
  }),
);

Radio.__ANT_MOBILE_RADIO = true;

// Group
interface IRadioOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface IRadioGroupProps extends RadioGroupProps {
  options: IRadioOption[];
}

const BaseRadioGroup: FunctionComponent<IRadioGroupProps> = (props) => {
  const { options } = props;

  return (
    <AntdMobileRadio.Group>
      <Space direction="vertical">
        {options.map((option) => {
          return (
            <AntdMobileRadio key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </AntdMobileRadio>
          );
        })}
      </Space>
    </AntdMobileRadio.Group>
  );
};

Radio.Group = connect(
  BaseRadioGroup,
  mapProps({
    dataSource: 'options',
  }),
);

export default Radio;
