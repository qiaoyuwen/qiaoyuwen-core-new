import { ICustomEvent } from '@qiaoyuwen-core-next/utils'
import { AbstractWorkspaceEvent } from './AbstractWorkspaceEvent'

export class SwitchWorkspaceEvent
  extends AbstractWorkspaceEvent
  implements ICustomEvent
{
  type = 'switch:workspace'
}
