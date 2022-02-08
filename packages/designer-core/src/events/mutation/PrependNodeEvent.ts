import { ICustomEvent } from '@qiaoyuwen-core-next/utils'
import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent'

export class PrependNodeEvent
  extends AbstractMutationNodeEvent
  implements ICustomEvent
{
  type = 'prepend:node'
}
