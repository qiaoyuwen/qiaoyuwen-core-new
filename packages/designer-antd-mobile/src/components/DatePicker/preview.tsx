import React from 'react';
import { DatePicker as FormilyDatePicker } from '@qiaoyuwen-core-next/formily-antd-mobile';
import { createBehavior, createResource } from '@qiaoyuwen-core-next/designer-core';
import { DnFC } from '@qiaoyuwen-core-next/designer-react';
import { createFieldSchema } from '../Field';
import { AllSchemas } from '../../schemas';
import { AllLocales } from '../../locales';

export const DatePicker: DnFC<React.ComponentProps<typeof FormilyDatePicker>> = FormilyDatePicker;

DatePicker.Behavior = createBehavior({
  name: 'DatePicker',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'DatePicker',
  designerProps: {
    propsSchema: createFieldSchema({
      component: AllSchemas.DatePicker,
      dataSourceSetter: false,
      defaultValueInputType: ['DATE', 'DATETIME'],
    }),
  },
  designerLocales: AllLocales.DatePicker,
});

DatePicker.Resource = createResource({
  icon: 'DatePickerSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'string',
        title: 'DatePicker',
        'x-decorator': 'FormItem',
        'x-component': 'DatePicker',
        'x-component-props': {
          getContainer: () => document.getElementsByClassName('dn-mobile-simulator-body-content')[0],
        },
      },
    },
  ],
});
