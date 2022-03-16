import React from 'react'
import { TreeNode } from '@qiaoyuwen-core-next/designer-core'
import { MonacoInput } from '@qiaoyuwen-core-next/designer-react-settings-form'
import { isEmpty, isPlainObj } from '@formily/shared'

export interface IMobileMarkupSchemaWidgetProps {
  tree: TreeNode
}

const transformToMarkupSchemaCode = (tree: TreeNode) => {
  const printAttribute = (node: TreeNode) => {
    if (!node) return ''
    const props = { ...node.props }
    if (node.depth !== 0) {
      props.name = node.props.name || node.id
    }
    return `${Object.keys(props)
      .map((key) => {
        if (
          key === 'x-designable-id' ||
          key === 'x-designable-source-name' ||
          key === '_isJSONSchemaObject' ||
          key === 'version' ||
          key === 'type'
        )
          return ''
        const value = props[key]
        if (isPlainObj(value) && isEmpty(value)) return ''
        if (typeof value === 'string') return `${key}="${value}"`
        return `${key}={${JSON.stringify(value)}}`
      })
      .join(' ')}`
  }
  const printChildren = (node: TreeNode) => {
    if (!node) return ''
    return node.children
      .map((child) => {
        return printNode(child)
      })
      .join('')
  }
  const printTag = (node: TreeNode) => {
    if (node.props.type === 'string') return 'SchemaField.String'
    if (node.props.type === 'number') return 'SchemaField.Number'
    if (node.props.type === 'boolean') return 'SchemaField.Boolean'
    if (node.props.type === 'date') return 'SchemaField.Date'
    if (node.props.type === 'datetime') return 'SchemaField.DateTime'
    if (node.props.type === 'array') return 'SchemaField.Array'
    if (node.props.type === 'object') return 'SchemaField.Object'
    if (node.props.type === 'void') return 'SchemaField.Void'
    return 'SchemaField.Markup'
  }
  const printNode = (node: TreeNode) => {
    if (!node) return ''
    return `<${printTag(node)} ${printAttribute(node)} ${
      node.children.length
        ? `>${printChildren(node)}</${printTag(node)}>`
        : '/>'
    }`
  }
  const root = tree.find((child) => {
    return child.componentName === 'Form' || child.componentName === 'Root'
  })
  return `import React, { useMemo } from 'react'
import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/react'
import {
  Form,
  FormItem,
  Input,
  Selector,
  Slider,
  Stepper,
  Switch,
  Checkbox,
  Radio,
  Rate,
  DatePicker,
} from '@qiaoyuwen-core-next/formily-antd-mobile'

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    Selector,
    Slider,
    Stepper,
    Switch,
    Checkbox,
    Radio,
    Rate,
    DatePicker,
  },
})

export default ()=>{
  const form = useMemo(() => createForm(), [])

  return <Form form={form} ${printAttribute(root)}>
    <SchemaField>
      ${printChildren(root)}
    </SchemaField>
  </Form>
}
  
`
}

const TempMonacoInput = MonacoInput as any;

export const MobileMarkupSchemaWidget: React.FC<IMobileMarkupSchemaWidgetProps> = (
  props
) => {
  return (
    <TempMonacoInput
      {...props}
      options={{ readOnly: true }}
      value={transformToMarkupSchemaCode(props.tree)}
      language="typescript"
    />
  )
}
