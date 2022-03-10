import { createContext, ReactNode, useContext } from 'react';

export interface IFormLayoutProps {
  layout?: 'vertical' | 'horizontal';
  mode?: 'default' | 'card';
  footer?: ReactNode;
  shallow?: boolean;
  requiredMarkStyle?: 'asterisk' | 'text-required' | 'text-optional';
  hasFeedback?: boolean;
}

export interface IFormLayoutContext extends IFormLayoutProps {}

export const FormLayoutDeepContext = createContext<IFormLayoutContext>(null);

export const FormLayoutShallowContext = createContext<IFormLayoutContext>(null);

export const useFormDeepLayout = () => useContext(FormLayoutDeepContext);

export const useFormShallowLayout = () => useContext(FormLayoutShallowContext);

export const useFormLayout = () => ({
  ...useFormDeepLayout(),
  ...useFormShallowLayout(),
});

export const FormLayout: React.FC<IFormLayoutProps> & {
  useFormLayout: () => IFormLayoutContext;
  useFormDeepLayout: () => IFormLayoutContext;
  useFormShallowLayout: () => IFormLayoutContext;
} = (props) => {
  const { children, shallow } = props;
  const deepLayout = useFormDeepLayout();

  const newDeepLayout = {
    ...deepLayout,
  };
  if (!shallow) {
    Object.assign(newDeepLayout, props);
  }

  return (
    <FormLayoutDeepContext.Provider value={newDeepLayout}>
      <FormLayoutShallowContext.Provider value={shallow ? props : undefined}>
        {children}
      </FormLayoutShallowContext.Provider>
    </FormLayoutDeepContext.Provider>
  );
};

FormLayout.useFormDeepLayout = useFormDeepLayout;
FormLayout.useFormShallowLayout = useFormShallowLayout;
FormLayout.useFormLayout = useFormLayout;

export default FormLayout;
