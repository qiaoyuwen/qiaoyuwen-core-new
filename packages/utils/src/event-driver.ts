/* eslint-disable @typescript-eslint/no-explicit-any */
import { ISubscriber } from '.';
import { Event, ICustomEvent, ICustomEventClass } from './event';

export const EVENTS_SYMBOL = Symbol('EVENTS_SYMBOL');
export const EVENTS_ONCE_SYMBOL = Symbol('EVENTS_ONCE_SYMBOL');
export const EVENTS_BATCH_SYMBOL = Symbol('EVENTS_BATCH_SYMBOL');
export const DRIVER_INSTANCES_SYMBOL = Symbol('DRIVER_INSTANCES_SYMBOL');

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

export interface IEventDriverClass<T> {
  new (engine: T, context?: any): IEventDriver;
}

export interface IEventEffect<T> {
  (engine: T): void;
}

const isOnlyMode = (mode: string) => mode === 'onlyOne' || mode === 'onlyChild' || mode === 'onlyParent';

/**
 * 事件驱动器基类
 */
export class EventDriver<Engine extends Event = Event, Context = any> {
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

  public subscribeTo<T extends ICustomEventClass>(type: T, subscriber: ISubscriber<InstanceType<T>>) {
    return this.engine.subscribeTo(type, subscriber);
  }

  public subscribeWith<T extends ICustomEvent = ICustomEvent>(type: string | string[], subscriber: ISubscriber<T>) {
    return this.engine.subscribeWith(type, subscriber);
  }

  public attach(container: EventDriverContainer) {
    console.error('attach must implement.');
  }

  public detach(container: EventDriverContainer) {
    console.error('detach must implement.');
  }

  public eventTarget(type: string) {
    if (type === 'resize' || type === 'scroll') {
      if (this.container === this.contentWindow?.document) {
        return this.contentWindow;
      }
    }
    return this.container;
  }

  public addEventListener<K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
    options?: boolean | EventOptions,
  ): void;
  public addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventOptions,
  ): void;
  public addEventListener(type: any, listener: any, options: any) {
    const target = this.eventTarget(type);
    if (isOnlyMode(options?.mode)) {
      target[EVENTS_ONCE_SYMBOL] = target[EVENTS_ONCE_SYMBOL] || {};
      const constructor = this.constructor;
      constructor[EVENTS_ONCE_SYMBOL] = target[EVENTS_ONCE_SYMBOL] || {};
      const handler = target[EVENTS_ONCE_SYMBOL][type];
      const container = constructor[EVENTS_ONCE_SYMBOL][type];
      if (!handler) {
        if (container) {
          if (options?.mode === 'onlyChild') {
            if (container.contains(target)) {
              container.removeEventListener(type, container[EVENTS_ONCE_SYMBOL][type], options);
            }
            delete container[EVENTS_ONCE_SYMBOL][type];
          } else if (options?.mode === 'onlyParent') {
            if (container.contains(target)) {
              return;
            }
          }
        }
        target.addEventListener(type, listener, options);
        target[EVENTS_ONCE_SYMBOL][type] = listener;
        constructor[EVENTS_ONCE_SYMBOL][type] = target;
      }
    } else {
      target[EVENTS_SYMBOL] = target[EVENTS_SYMBOL] || {};
      target[EVENTS_SYMBOL][type] = target[EVENTS_SYMBOL][type] || {};
      if (!target[EVENTS_SYMBOL][type]?.get?.(listener)) {
        target.addEventListener(type, listener, options);
        target[EVENTS_SYMBOL][type]?.set?.(listener, true);
      }
    }
  }

  public removeEventListener<K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
    options?: boolean | EventOptions,
  ): void;
  public removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventOptions,
  ): void;
  public removeEventListener(type: any, listener: any, options: any) {
    const target = this.eventTarget(type);
    if (isOnlyMode(options?.mode)) {
      const constructor = this.constructor;
      constructor[EVENTS_ONCE_SYMBOL] = constructor[EVENTS_ONCE_SYMBOL] || {};
      target[EVENTS_ONCE_SYMBOL] = target[EVENTS_ONCE_SYMBOL] || {};
      delete constructor[EVENTS_ONCE_SYMBOL][type];
      delete target[EVENTS_ONCE_SYMBOL][type];
      target.removeEventListener(type, listener, options);
    } else {
      target[EVENTS_SYMBOL] = target[EVENTS_SYMBOL] || {};
      target[EVENTS_SYMBOL][type] = target[EVENTS_SYMBOL][type] || {};
      target[EVENTS_SYMBOL][type]?.delete?.(listener);
      target.removeEventListener(type, listener, options);
    }
  }

  public batchAddEventListener<K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
    options?: boolean | EventOptions,
  ): void;
  public batchAddEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventOptions,
  ): void;
  public batchAddEventListener(type: any, listener: any, options?: any) {
    this.engine[DRIVER_INSTANCES_SYMBOL] = this.engine[DRIVER_INSTANCES_SYMBOL] || [];
    if (!this.engine[DRIVER_INSTANCES_SYMBOL].includes(this)) {
      this.engine[DRIVER_INSTANCES_SYMBOL].push(this);
    }
    this.engine[DRIVER_INSTANCES_SYMBOL].forEach((driver) => {
      const target = driver.eventTarget(type);
      target[EVENTS_BATCH_SYMBOL] = target[EVENTS_BATCH_SYMBOL] || {};
      if (!target[EVENTS_BATCH_SYMBOL][type]) {
        target.addEventListener(type, listener, options);
        target[EVENTS_BATCH_SYMBOL][type] = listener;
      }
    });
  }

  public batchRemoveEventListener<K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
    options?: boolean | EventOptions,
  ): void;
  public batchRemoveEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventOptions,
  ): void;
  public batchRemoveEventListener(type: any, listener: any, options: any) {
    this.engine[DRIVER_INSTANCES_SYMBOL] = this.engine[DRIVER_INSTANCES_SYMBOL] || [];
    this.engine[DRIVER_INSTANCES_SYMBOL].forEach((driver) => {
      const target = driver.eventTarget(type);
      target[EVENTS_BATCH_SYMBOL] = target[EVENTS_BATCH_SYMBOL] || {};
      target.removeEventListener(type, listener, options);
      delete target[EVENTS_BATCH_SYMBOL][type];
    });
  }
}
