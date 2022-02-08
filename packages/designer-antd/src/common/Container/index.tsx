import React from 'react'
import { observer } from '@formily/reactive-react'
import { DroppableWidget } from '@qiaoyuwen-core-next/designer-react'
import './styles.less'

export const Container: React.FC = observer((props) => {
  return <DroppableWidget>{props.children}</DroppableWidget>
})

export const withContainer = (Target: React.JSXElementConstructor<any>) => {
  return (props: any) => {
    return (
      <DroppableWidget>
        <Target {...props} />
      </DroppableWidget>
    )
  }
}
