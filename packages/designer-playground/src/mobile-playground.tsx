import 'antd/dist/antd.less';
import { useMemo } from 'react';
import {
  Designer,
  DesignerToolsWidget,
  ViewToolsWidget,
  Workspace,
  OutlineTreeWidget,
  ResourceWidget,
  HistoryWidget,
  StudioPanel,
  CompositePanel,
  WorkspacePanel,
  ToolbarPanel,
  ViewportPanel,
  ViewPanel,
  SettingsPanel,
  ComponentTreeWidget,
} from '@qiaoyuwen-core-next/designer-react';
import { createDesigner, GlobalRegistry, Shortcut, KeyCode, ScreenType } from '@qiaoyuwen-core-next/designer-core';
import { ActionsWidget, MobilePreviewWidget, SchemaEditorWidget, MobileMarkupSchemaWidget } from './widgets';
import { saveSchema } from './service';
import { Form, Field, Input, Selector, Slider } from '@qiaoyuwen-core-next/designer-antd-mobile';
import { SettingsForm, setNpmCDNRegistry } from '@qiaoyuwen-core-next/designer-react-settings-form';

setNpmCDNRegistry('//unpkg.com');

GlobalRegistry.registerDesignerLocales({
  'zh-CN': {
    sources: {
      Inputs: '输入控件',
      MobileInputs: '移动端输入控件',
      Layouts: '布局组件',
      Arrays: '自增组件',
      Displays: '展示组件',
    },
  },
  'en-US': {
    sources: {
      Inputs: 'Inputs',
      MobileInputs: 'MobileInputs',
      Layouts: 'Layouts',
      Arrays: 'Arrays',
      Displays: 'Displays',
    },
  },
});

export const MobilePlayground = () => {
  const engine = useMemo(
    () =>
      createDesigner({
        defaultScreenType: ScreenType.Mobile,
        shortcuts: [
          new Shortcut({
            codes: [
              [KeyCode.Meta, KeyCode.S],
              [KeyCode.Control, KeyCode.S],
            ],
            handler(ctx) {
              saveSchema(ctx.engine);
            },
          }),
        ],
        rootComponentName: 'Form',
      }),
    [],
  );

  return (
    <Designer engine={engine}>
      <StudioPanel actions={<ActionsWidget />}>
        <CompositePanel>
          <CompositePanel.Item title="panels.Component" icon="Component">
            <ResourceWidget title="sources.Inputs" sources={[Input, Selector, Slider]} />
          </CompositePanel.Item>
          <CompositePanel.Item title="panels.OutlinedTree" icon="Outline">
            <OutlineTreeWidget />
          </CompositePanel.Item>
          <CompositePanel.Item title="panels.History" icon="History">
            <HistoryWidget />
          </CompositePanel.Item>
        </CompositePanel>
        <Workspace id="form">
          <WorkspacePanel>
            <ToolbarPanel>
              <DesignerToolsWidget />
              <ViewToolsWidget use={['DESIGNABLE', 'JSONTREE', 'MARKUP', 'PREVIEW']} />
            </ToolbarPanel>
            <ViewportPanel>
              <ViewPanel type="DESIGNABLE">
                {() => (
                  <ComponentTreeWidget
                    components={{
                      Form,
                      Field,
                      Input,
                      Selector,
                      Slider,
                    }}
                  />
                )}
              </ViewPanel>
              <ViewPanel type="JSONTREE" scrollable={false}>
                {(tree, onChange) => <SchemaEditorWidget tree={tree} onChange={onChange} />}
              </ViewPanel>
              <ViewPanel type="MARKUP" scrollable={false}>
                {(tree) => <MobileMarkupSchemaWidget tree={tree} />}
              </ViewPanel>
              <ViewPanel type="PREVIEW">{(tree) => <MobilePreviewWidget tree={tree} />}</ViewPanel>
            </ViewportPanel>
          </WorkspacePanel>
        </Workspace>
        <SettingsPanel title="panels.PropertySettings">
          <SettingsForm uploadAction="" />
        </SettingsPanel>
      </StudioPanel>
    </Designer>
  );
};
