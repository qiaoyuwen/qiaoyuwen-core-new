import { connect, mapProps } from '@formily/react';
import { Checkbox as AntdMobileCheckbox, Space } from 'antd-mobile';
import { CheckboxGroupProps, CheckboxProps } from 'antd-mobile/es/components/checkbox';
import { FunctionComponent } from 'react';

type ComposedCheckbox = FunctionComponent<CheckboxProps> & {
  Group?: React.FC<CheckboxGroupProps>;
  __ANT_MOBILE_CHECKBOX?: boolean;
};

export const Checkbox: ComposedCheckbox = connect(
  AntdMobileCheckbox,
  mapProps({
    value: 'checked',
    onInput: 'onChange',
  }),
);

Checkbox.__ANT_MOBILE_CHECKBOX = true;

// Group
interface ICheckboxOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface ICheckboxGroupProps extends CheckboxGroupProps {
  options: ICheckboxOption[];
}

const BaseCheckboxGroup: FunctionComponent<ICheckboxGroupProps> = (props) => {
  const { options } = props;

  return (
    <AntdMobileCheckbox.Group>
      <Space direction="vertical">
        {options.map((option) => {
          return (
            <AntdMobileCheckbox key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </AntdMobileCheckbox>
          );
        })}
      </Space>
    </AntdMobileCheckbox.Group>
  );
};

Checkbox.Group = connect(
  BaseCheckboxGroup,
  mapProps({
    dataSource: 'options',
  }),
);

export default Checkbox;
