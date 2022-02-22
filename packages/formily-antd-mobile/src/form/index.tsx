import React from 'react';
import { Form as FormType, IFormFeedback } from '@formily/core';
import { useForm, FormProvider, JSXComponent } from '@formily/react';
import { List } from 'antd-mobile';

export interface FormProps {
  form?: FormType;
  component?: JSXComponent;
  onAutoSubmit?: (values: any) => any;
  onAutoSubmitFailed?: (feedbacks: IFormFeedback[]) => void;

  // layout props
  layout?: 'vertical' | 'horizontal';
}

export const Form: React.FC<FormProps> = ({ form, component, onAutoSubmit, onAutoSubmitFailed, ...props }) => {
  const top = useForm();
  const renderContent = (form: FormType) =>
    React.createElement(
      component,
      {
        onSubmit(e: React.FormEvent) {
          e?.stopPropagation?.();
          e?.preventDefault?.();
          form.submit(onAutoSubmit).catch(onAutoSubmitFailed);
        },
      },
      <List>{props.children}</List>,
    );
  if (form) return <FormProvider form={form}>{renderContent(form)}</FormProvider>;
  if (!top) throw new Error('must pass form instance by createForm');
  return renderContent(top);
};

Form.defaultProps = {
  component: 'form',
};

export default Form;
