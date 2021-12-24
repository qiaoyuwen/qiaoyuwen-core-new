/* eslint-disable guard-for-in */
/* eslint-disable dot-notation */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { isFn, isNil } from './types';

export const UNSUBSCRIBE_ID_SYMBOL = Symbol('UNSUBSCRIBE_ID_SYMBOL');

export interface ISubscriber<Payload = any> {
  (payload: Payload): void | boolean;
}

export class Subscribable<ExtendsType = any> {
  private _index: number = 0;
  private _subscribers: {
    [key: number]: ISubscriber;
  } = {};

  public getSubscribersCount() {
    return Object.keys(this._subscribers).length;
  }

  public dispatch<T extends ExtendsType = any>(event: T, context?: any) {
    let interrupted = false;
    for (const key in this._subscribers) {
      event['context'] = context;
      if (this._subscribers[key](event) === false) {
        interrupted = true;
      }
    }

    return interrupted ? false : true;
  }

  public subscribe(subscriber: ISubscriber) {
    let id: number;
    if (isFn(subscriber)) {
      id = this._index + 1;
      this._subscribers[id] = subscriber;
      this._index++;
    }

    const unsubscribe = () => {
      this.unsubscribe(id);
    };

    unsubscribe[UNSUBSCRIBE_ID_SYMBOL] = id;
    return unsubscribe;
  }

  public unsubscribe(id?: number | string | (() => void)) {
    if (isNil(id)) {
      for (const key in this._subscribers) {
        this.unsubscribe(key);
      }
      return;
    }
    if (!isFn(id)) {
      delete this._subscribers[id];
    } else {
      delete this._subscribers[id[UNSUBSCRIBE_ID_SYMBOL]];
    }
  }
}
