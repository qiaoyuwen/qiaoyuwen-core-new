import { ICustomEvent } from '@qiaoyuwen-core-next/utils'
import { AbstractWorkspaceEvent } from './AbstractWorkspaceEvent'
export class AddWorkspaceEvent
  extends AbstractWorkspaceEvent
  implements ICustomEvent
{
  type = 'add:workspace'
}
