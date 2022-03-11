import { List, Popover } from 'antd-mobile';
import { QuestionCircleOutline } from 'antd-mobile-icons';
import { useConfig } from 'antd-mobile/es/components/config-provider';
import { FunctionComponent } from 'react';
import { useFormLayout } from '../form-layout';
import cls from 'classnames';
import { connect, mapProps } from '@formily/react';
import { isVoidField } from '@formily/core';
import { pickDataProps } from '../__builtins__';
import './index.less';

const AnyPopover = Popover as any;

const classPrefix = `adm-form-item`;

export interface IFormItemProps {
  required?: boolean;
  label?: React.ReactNode;
  help?: React.ReactNode;
  htmlFor?: string;
  description?: React.ReactNode;
  hasFeedback?: boolean;
  errors?: string[];
  warnings?: string[];
  className?: string;
  style?: React.CSSProperties;
  layout?: 'vertical' | 'horizontal';
  extra?: React.ReactNode;
  hidden?: boolean;
  disabled?: boolean;
  arrow?: boolean | React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  childElementPosition?: 'normal' | 'right';
}

const BaseItem: FunctionComponent<IFormItemProps> = (props) => {
  const {
    required,
    label,
    help,
    htmlFor,
    style,
    className,
    children,
    extra,
    hidden,
    disabled,
    arrow,
    childElementPosition = 'normal',
  } = props;
  const layoutContext = useFormLayout();
  const hasFeedback = props.hasFeedback !== undefined ? props.hasFeedback : layoutContext.hasFeedback;
  const layout = props.layout || layoutContext.layout || 'vertical';
  const { locale } = useConfig();

  const requiredMark = (() => {
    const { requiredMarkStyle = 'asterisk' } = layoutContext;
    switch (requiredMarkStyle) {
      case 'asterisk':
        return required && <span className={`${classPrefix}-required-asterisk`}>*</span>;
      case 'text-required':
        return required && <span className={`${classPrefix}-required-text`}>({locale.Form.required})</span>;
      case 'text-optional':
        return !required && <span className={`${classPrefix}-required-text`}>({locale.Form.optional})</span>;
      default:
        return null;
    }
  })();

  const labelElement = label ? (
    <label className={`${classPrefix}-label`} htmlFor={htmlFor}>
      {label}
      {requiredMark}
      {help && (
        <span className={`${classPrefix}-label-help`}>
          <AnyPopover content={help} mode="dark" trigger="click">
            <QuestionCircleOutline />
          </AnyPopover>
        </span>
      )}
    </label>
  ) : null;

  const description = (
    <>
      {props.description}
      {hasFeedback && (
        <>
          {props.errors?.map((error, index) => (
            <div key={`error-${index}`} className={`${classPrefix}-feedback-error`}>
              {error}
            </div>
          ))}
          {props.warnings?.map((warning, index) => (
            <div key={`warning-${index}`} className={`${classPrefix}-feedback-warning`}>
              {warning}
            </div>
          ))}
        </>
      )}
    </>
  );

  return (
    <List.Item
      {...pickDataProps(props)}
      style={style}
      title={layout === 'vertical' && labelElement}
      prefix={layout === 'horizontal' && labelElement}
      extra={extra}
      description={description}
      className={cls(classPrefix, className, `${classPrefix}-${layout}`, {
        [`${classPrefix}-hidden`]: hidden,
      })}
      disabled={disabled}
      onClick={props.onClick}
      arrow={arrow}
    >
      <div className={cls(`${classPrefix}-child`, `${classPrefix}-child-position-${childElementPosition}`)}>
        <div className={cls(`${classPrefix}-child-inner`)}>{children}</div>
      </div>
    </List.Item>
  );
};

type ComposeFormItem = React.FC<IFormItemProps> & {
  BaseItem?: React.FC<IFormItemProps>;
};

// 适配
export const FormItem: ComposeFormItem = connect(
  BaseItem,
  mapProps((props, field) => {
    if (isVoidField(field)) {
      return {
        label: field.title || props.label,
        description: props.description || field.description,
      };
    }
    if (!field) return props;

    const newProps = {
      ...props,
      label: props.label || field.title,
      required: props.required ?? field.required,
      description: props.description || field.description,
      errors: field.selfErrors.length ? field.selfErrors : [],
      warnings: field.selfWarnings.length ? field.selfWarnings : [],
      hasFeedback: !!(field.selfErrors.length || field.selfWarnings.length),
    };

    return newProps;
  }),
);

FormItem.BaseItem = BaseItem;

export default FormItem;
