import React from 'react';
import { observer } from '@formily/react';
import { DroppableWidget } from '@qiaoyuwen-core-next/designer-react';

export const Container: React.FC = observer((props) => {
  return <DroppableWidget>{props.children}</DroppableWidget>;
});

export const withContainer = (Target: React.JSXElementConstructor<any>) => {
  return (props: any) => {
    return (
      <DroppableWidget>
        <Target {...props} />
      </DroppableWidget>
    );
  };
};
