import React, { CSSProperties, FunctionComponent, ReactNode } from 'react';
import { Form as FormType, IFormFeedback } from '@formily/core';
import { useForm, FormProvider, JSXComponent } from '@formily/react';
import { List } from 'antd-mobile';
import FormLayout, { IFormLayoutProps } from '../form-layout';
import cls from 'classnames';

export const Header: FunctionComponent = () => null;

const classPrefix = 'adm-form';

export interface FormProps extends IFormLayoutProps {
  form?: FormType;
  component?: JSXComponent;
  onAutoSubmit?: (values: any) => any;
  onAutoSubmitFailed?: (feedbacks: IFormFeedback[]) => void;
  className?: string;
  style?: CSSProperties;
}

export const Form: React.FC<FormProps> & { Header: typeof Header } = ({
  form,
  component,
  onAutoSubmit,
  onAutoSubmitFailed,
  className,
  style,
  ...props
}) => {
  const top = useForm();

  const renderContent = (form: FormType) => {
    const lists: ReactNode[] = [];

    let currentHeader: ReactNode = null;
    let items: ReactNode[] = [];
    let count = 0;
    function collect() {
      if (items.length === 0) return;
      count += 1;
      lists.push(
        <List header={currentHeader} key={count} mode={props.mode}>
          {items}
        </List>,
      );
      items = [];
    }
    React.Children.forEach(props.children, (child, index) => {
      if (React.isValidElement(child) && child.type === Header) {
        collect();
        currentHeader = child.props.children;
      } else {
        items.push(child);
      }
    });
    collect();

    return (
      <div className={cls(classPrefix, className)} style={style}>
        <FormLayout {...props}>
          {React.createElement(
            component,
            {
              onSubmit(e: React.FormEvent) {
                e?.stopPropagation?.();
                e?.preventDefault?.();
                form.submit(onAutoSubmit).catch(onAutoSubmitFailed);
              },
            },
            lists,
          )}
        </FormLayout>
      </div>
    );
  };
  if (form) return <FormProvider form={form}>{renderContent(form)}</FormProvider>;
  if (!top) throw new Error('must pass form instance by createForm');
  return renderContent(top);
};

Form.defaultProps = {
  component: 'form',
};

Form.Header = Header;

export default Form;
