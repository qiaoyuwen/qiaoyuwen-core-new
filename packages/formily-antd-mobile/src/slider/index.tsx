import { FunctionComponent } from 'react';
import { Slider as AntdMobileSlider } from 'antd-mobile';
import { connect, mapProps } from '@formily/react';
import { SliderProps } from 'antd-mobile/es/components/slider';
import { isVoidField } from '@formily/core';

export const Slider: FunctionComponent<SliderProps> = connect(
  AntdMobileSlider,
  mapProps((props, field) => {
    if (isVoidField(field)) {
      return props;
    }

    if (props.step <= 0) {
      props.step = 1;
    }

    if (props.range && !Array.isArray(props.value)) {
      props.value = [props.min, props.min];
    }

    return {
      ...props,
    };
  }),
);

export default Slider;
