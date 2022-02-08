import { useContext, useEffect } from 'react'
import { Engine } from '@qiaoyuwen-core-next/designer-core'
import { DesignerEngineContext } from '../context'
import { isFn } from '@qiaoyuwen-core-next/utils'
export interface IEffects {
  (engine: Engine): void
}

export const useDesigner = (effects?: IEffects): Engine => {
  const designer: Engine =
    window['__DESIGNABLE_ENGINE__'] || useContext(DesignerEngineContext)
  useEffect(() => {
    if (isFn(effects)) {
      return effects(designer) as any
    }
  }, [])
  return designer
}
