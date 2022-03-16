import { DatePicker as AntdMobileDatePicker } from 'antd-mobile';
import { DatePickerProps } from 'antd-mobile/es/components/date-picker';
import { FunctionComponent, ReactNode, useState } from 'react';
import dayjs from 'dayjs';
import { connect, mapProps } from '@formily/react';
import './index.less';

export interface IDatePickerProps extends DatePickerProps {
  placeholder?: string;
  formatTemplate?: string;
  format?: (value: Date | null) => ReactNode;
}

const BaseDatePicker: FunctionComponent<IDatePickerProps> = ({ placeholder, formatTemplate, format, ...props }) => {
  const [visible, setVisible] = useState(false);

  const getFormat = () => {
    if (format) {
      return format;
    }

    return (value: Date | null) => {
      return value ? dayjs(value).format(formatTemplate || 'YYYY-MM-DD') : placeholder || '请选择日期';
    };
  };

  return (
    <div onClick={() => setVisible(true)}>
      <AntdMobileDatePicker
        {...props}
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
      >
        {getFormat()}
      </AntdMobileDatePicker>
    </div>
  );
};

export const DatePicker: FunctionComponent<IDatePickerProps> = connect(BaseDatePicker);

export default DatePicker;
