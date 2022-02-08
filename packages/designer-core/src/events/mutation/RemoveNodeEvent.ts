import { ICustomEvent } from '@qiaoyuwen-core-next/utils'
import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent'

export class RemoveNodeEvent
  extends AbstractMutationNodeEvent
  implements ICustomEvent
{
  type = 'remove:node'
}
