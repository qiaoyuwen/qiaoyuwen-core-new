import { Subscribable, UNSUBSCRIBE_ID_SYMBOL } from '../src/index';

describe('Subscribable', () => {
  it('subscribe', () => {
    const subscribable = new Subscribable();
    subscribable.subscribe(() => {});
    expect(subscribable.getSubscribersCount()).toBe(1);
  });

  it('invalid subscribe', () => {
    const subscribable = new Subscribable();
    subscribable.subscribe(undefined);
    subscribable.subscribe(null);
    expect(subscribable.getSubscribersCount()).toBe(0);
  });

  it('unsubscribe all', () => {
    const subscribable = new Subscribable();
    subscribable.subscribe(() => {});
    subscribable.subscribe(() => {});
    expect(subscribable.getSubscribersCount()).toBe(2);
    subscribable.unsubscribe();
    expect(subscribable.getSubscribersCount()).toBe(0);
  });

  it('unsubscribe by id', () => {
    const subscribable = new Subscribable();
    let unsubscribe = subscribable.subscribe(() => {});

    subscribable.unsubscribe(unsubscribe[UNSUBSCRIBE_ID_SYMBOL]);
    expect(subscribable.getSubscribersCount()).toBe(0);

    unsubscribe = subscribable.subscribe(() => {});
    subscribable.unsubscribe(unsubscribe);
    expect(subscribable.getSubscribersCount()).toBe(0);
  });

  it('unsubscribe by return', () => {
    const subscribable = new Subscribable();
    const unsubscribe = subscribable.subscribe(() => {});

    unsubscribe();
    expect(subscribable.getSubscribersCount()).toBe(0);
  });

  it('dispatch', () => {
    const subscribable = new Subscribable();
    subscribable.subscribe(() => {});
    const event = {
      context: '',
    };
    const result = subscribable.dispatch(event, 'context');
    expect(event.context).toBe('context');
    expect(result).toBe(true);
  });

  it('dispatch interrupted', () => {
    const subscribable = new Subscribable();
    subscribable.subscribe(() => false);
    const event = {
      context: '',
    };
    const result = subscribable.dispatch(event, 'context');
    expect(event.context).toBe('context');
    expect(result).toBe(false);
  });
});
