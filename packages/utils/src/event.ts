/* eslint-disable @typescript-eslint/no-explicit-any */
import { Subscribable } from '.';

export interface ICustomEvent<EventData = any, EventContext = any> {
  type: string;
  data?: EventData;
  context?: EventContext;
}

/**
 * 事件引擎
 */
export class Event extends Subscribable<ICustomEvent> {}
