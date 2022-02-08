import { ICustomEvent } from '@qiaoyuwen-core-next/utils'
import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent'

export class DropNodeEvent
  extends AbstractMutationNodeEvent
  implements ICustomEvent
{
  type = 'drop:node'
}
