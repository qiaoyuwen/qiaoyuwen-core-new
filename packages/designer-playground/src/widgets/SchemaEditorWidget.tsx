import React from 'react'
import {
  transformToSchema,
  transformToTreeNode,
} from '@qiaoyuwen-core-next/designer-transformer'
import { TreeNode, ITreeNode } from '@qiaoyuwen-core-next/designer-core'
import { MonacoInput } from '@qiaoyuwen-core-next/designer-react-settings-form'

export interface ISchemaEditorWidgetProps {
  tree: TreeNode
  onChange?: (tree: ITreeNode) => void
}

const TempMonacoInput = MonacoInput as any;

export const SchemaEditorWidget: React.FC<ISchemaEditorWidgetProps> = (
  props
) => {
  return (
    <TempMonacoInput
      {...props}
      value={JSON.stringify(transformToSchema(props.tree as any), null, 2)}
      onChange={(value) => {
        props.onChange?.(transformToTreeNode(JSON.parse(value)) as any)
      }}
      language="json"
    />
  )
}
