import { FunctionComponent } from 'react';
import { Selector as AntdMobileSelector } from 'antd-mobile';
import { connect, mapProps } from '@formily/react';
import { SelectorProps } from 'antd-mobile/es/components/selector';
import { isVoidField } from '@formily/core';

export const Selector: FunctionComponent<SelectorProps<string | number>> = connect(
  AntdMobileSelector,
  mapProps((props, field) => {
    let options = [];
    if (!isVoidField(field)) {
      options = field.dataSource ?? [];
    }

    return {
      ...props,
      options,
    };
  }),
);

export default Selector;
