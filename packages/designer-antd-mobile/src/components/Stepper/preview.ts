import { Stepper as FormilyStepper } from '@qiaoyuwen-core-next/formily-antd-mobile';
import { createBehavior, createResource } from '@qiaoyuwen-core-next/designer-core';
import { DnFC } from '@qiaoyuwen-core-next/designer-react';
import { createFieldSchema } from '../Field';
import { AllSchemas } from '../../schemas';
import { AllLocales } from '../../locales';

export const Stepper: DnFC<React.ComponentProps<typeof FormilyStepper>> = FormilyStepper;

Stepper.Behavior = createBehavior({
  name: 'Stepper',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'Stepper',
  designerProps: {
    propsSchema: createFieldSchema({
      component: AllSchemas.Stepper,
    }),
  },
  designerLocales: AllLocales.Stepper,
});

Stepper.Resource = createResource({
  icon: 'NumberPickerSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'string',
        title: 'Stepper',
        'x-decorator': 'FormItem',
        'x-component': 'Stepper',
      },
    },
  ],
});
