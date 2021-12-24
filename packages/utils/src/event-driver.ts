/* eslint-disable @typescript-eslint/no-explicit-any */
import { ISubscriber } from '.';
import { Event, ICustomEvent } from './event';

export type EventContainer = Window | HTMLElement | Document;

export type EventDriverContainer = HTMLElement | Document;

export type EventOptions =
  | boolean
  | (AddEventListenerOptions &
      EventListenerOptions & {
        mode?: 'onlyOne' | 'onlyParent' | 'onlyChild';
      });

export interface IEventDriver {
  container: EventDriverContainer;
  contentWindow: Window;
  attach(container: EventDriverContainer): void;
  detach(container: EventDriverContainer): void;
  dispatch<T extends ICustomEvent = any>(event: T): void | boolean;
  subscribe<T extends ICustomEvent = any>(subscriber: ISubscriber<T>): void;
  addEventListener<K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
    options?: boolean | EventOptions,
  ): void;
  addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventOptions): void;
  addEventListener(type: any, listener: any, options: any): void;
  removeEventListener<K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
    options?: boolean | EventOptions,
  ): void;
  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventOptions,
  ): void;
  removeEventListener(type: any, listener: any, options?: any): void;
  batchAddEventListener<K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
    options?: boolean | EventOptions,
  ): void;
  batchAddEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventOptions,
  ): void;
  batchAddEventListener(type: any, listener: any, options?: any): void;
  batchRemoveEventListener<K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
    options?: boolean | EventOptions,
  ): void;
  batchRemoveEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventOptions,
  ): void;
  batchRemoveEventListener(type: any, listener: any, options: any): void;
}

/**
 * 事件驱动器基类
 */
export class EventDriver<Engine extends Event = Event, Context = any> /* implements IEventDriver */ {
  public engine: Engine;
  public container: EventDriverContainer = document;
  public contentWindow: Window = window;
  public context: Context;

  public constructor(engine: Engine, context?: Context) {
    this.engine = engine;
    this.context = context;
  }

  public dispatch<T extends ICustomEvent<any, any> = any>(event: T): boolean | void {
    return this.engine.dispatch(event, this.context);
  }

  public subscribe<T extends ICustomEvent<any, any> = any>(subscriber: ISubscriber<T>): void {
    this.engine.subscribe(subscriber);
  }
}
