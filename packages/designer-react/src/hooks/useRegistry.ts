import { GlobalRegistry, IDesignerRegistry } from '@qiaoyuwen-core-next/designer-core'

export const useRegistry = (): IDesignerRegistry => {
  return window['__DESIGNER_REGISTRY__'] || GlobalRegistry
}
