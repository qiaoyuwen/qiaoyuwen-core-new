import { FunctionComponent } from 'react';
import { Rate as AntdMobileRate } from 'antd-mobile';
import { connect } from '@formily/react';
import { RateProps } from 'antd-mobile/es/components/rate';

export const Rate: FunctionComponent<RateProps> = connect(AntdMobileRate);

export default Rate;
