import { ICustomEvent } from '@qiaoyuwen-core-next/utils'
import { AbstractCursorEvent } from './AbstractCursorEvent'

export class DragStartEvent
  extends AbstractCursorEvent
  implements ICustomEvent
{
  type = 'drag:start'
}
