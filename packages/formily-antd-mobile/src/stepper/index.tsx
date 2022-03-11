import { FunctionComponent } from 'react';
import { Stepper as AntdMobileStepper } from 'antd-mobile';
import { connect } from '@formily/react';
import { StepperProps } from 'antd-mobile/es/components/stepper';

export const Stepper: FunctionComponent<StepperProps> = connect(AntdMobileStepper);

export default Stepper;
