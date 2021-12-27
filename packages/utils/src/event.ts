/* eslint-disable @typescript-eslint/no-explicit-any */
import { isArr, isWindow, Subscribable } from '.';
import {
  DRIVER_INSTANCES_SYMBOL,
  EventContainer,
  EVENTS_BATCH_SYMBOL,
  EVENTS_ONCE_SYMBOL,
  EVENTS_SYMBOL,
  IEventDriverClass,
  IEventEffect,
} from './event-driver';
import { ISubscriber } from './subscribable';

const ATTACHED_SYMBOL = Symbol('ATTACHED_SYMBOL');

export interface ICustomEvent<EventData = any, EventContext = any> {
  type: string;
  data?: EventData;
  context?: EventContext;
}

export interface ICustomEventClass {
  new (...args: any[]): any;
}

export interface IEventProps<T = Event> {
  drivers?: IEventDriverClass<T>[];
  effects?: IEventEffect<T>[];
}

/**
 * 事件引擎
 */
export class Event extends Subscribable<ICustomEvent> {
  private _drivers: IEventDriverClass<any>[] = [];
  private _containers: EventContainer[] = [];

  public constructor(props?: IEventProps) {
    super();

    if (isArr(props?.effects)) {
      props.effects.forEach((plugin) => {
        plugin(this);
      });
    }

    if (isArr(props?.drivers)) {
      this._drivers = props.drivers;
    }
  }

  public subscribeTo<T extends ICustomEventClass>(type: T, subscriber: ISubscriber<InstanceType<T>>) {
    return this.subscribe((event) => {
      if (type && event instanceof type) {
        return subscriber(event);
      }
    });
  }

  public subscribeWith<T extends ICustomEvent = ICustomEvent>(type: string | string[], subscriber: ISubscriber<T>) {
    return this.subscribe((event) => {
      if (isArr(type)) {
        if (type.includes(event?.type)) {
          return subscriber(event);
        }
      } else {
        if (type && type === event?.type) {
          return subscriber(event);
        }
      }
    });
  }

  public attachEvents(container: EventContainer, contentWindow: Window = window, context?: any) {
    if (!container) {
      return;
    }
    if (isWindow(container)) {
      return this.attachEvents(container.document, container, context);
    }
    if (container[ATTACHED_SYMBOL]) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/naming-convention
    container[ATTACHED_SYMBOL] = this._drivers.map((EventDriverClass) => {
      const driver = new EventDriverClass(this, context);
      driver.container = container;
      driver.contentWindow = contentWindow;
      driver.attach(container);
      return driver;
    });
    if (!this._containers.includes(container)) {
      this._containers.push(container);
    }
  }

  public detachEvents(container?: EventContainer) {
    if (!container) {
      this._containers.forEach((c) => {
        this.detachEvents(c);
      });
      return;
    }
    if (isWindow(container)) {
      return this.detachEvents(container.document);
    }
    if (!container[ATTACHED_SYMBOL]) {
      return;
    }
    container[ATTACHED_SYMBOL].forEach((driver) => {
      driver.detach(container);
    });

    this[DRIVER_INSTANCES_SYMBOL] = this[DRIVER_INSTANCES_SYMBOL] || [];
    this[DRIVER_INSTANCES_SYMBOL] = this[DRIVER_INSTANCES_SYMBOL].reduce((drivers, driver) => {
      if (driver.container === container) {
        driver.detach(container);
        return drivers;
      }
      return drivers.concat(driver);
    }, []);
    this._containers = this._containers.filter((item) => item !== container);
    delete container[ATTACHED_SYMBOL];
    delete container[EVENTS_SYMBOL];
    delete container[EVENTS_ONCE_SYMBOL];
    delete container[EVENTS_BATCH_SYMBOL];
  }
}
