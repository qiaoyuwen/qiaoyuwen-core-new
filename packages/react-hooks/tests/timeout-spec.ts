import { act, renderHook } from '@testing-library/react-hooks';
import { useTimeout, useInterval, useCountdown } from '../src/timeout/index';

const timeout = (ms: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
};

describe('useTimeout', () => {
  test('executes after timeout', async () => {
    const fn = jest.fn();
    renderHook(() => useTimeout(fn, 10));
    await timeout(11);
    expect(fn).toHaveBeenCalled();
  });

  test('not executes if time is negative', async () => {
    const fn = jest.fn();
    renderHook(() => useTimeout(fn, -1));
    await timeout(5);
    expect(fn).not.toHaveBeenCalled();
  });

  test('stop on unmount', async () => {
    const fn = jest.fn();
    const { unmount } = renderHook(() => useTimeout(fn, 10));
    unmount();
    await timeout(11);
    expect(fn).not.toHaveBeenCalled();
  });
});

describe('useInterval', () => {
  test('executes every timeout', async () => {
    const fn = jest.fn();
    renderHook(() => useInterval(fn, 10));
    await timeout(25);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  test('not executes if time is negative', async () => {
    const fn = jest.fn();
    renderHook(() => useInterval(fn, -1));
    await timeout(5);
    expect(fn).not.toHaveBeenCalled();
  });

  test('stop on unmount', async () => {
    const fn = jest.fn();
    const { unmount } = renderHook(() => useInterval(fn, 10));
    unmount();
    await timeout(11);
    expect(fn).not.toHaveBeenCalled();
  });
});

describe('useCountdown', () => {
  test('init', async () => {
    const { result } = renderHook(() => useCountdown(0.5 * 1000, 0.1 * 1000));
    expect(result.current[0]).toStrictEqual(0.5 * 1000);

    const { result: result1 } = renderHook(() => useCountdown());
    expect(result1.current[0]).toStrictEqual(60 * 1000);
  });

  test('start', async () => {
    const { result } = renderHook(() => useCountdown(0.5 * 1000, 0.1 * 1000));
    await act(async () => {
      let index = 0;
      const timeId = setInterval(() => {
        index += 1;
        if (index > 5) {
          clearInterval(timeId);
          return;
        }
        expect(result.current[0]).toStrictEqual(0.5 * 1000 - 0.1 * 1000 * index);
      }, 0.1 * 1000 + 20);
      await result.current[1]();
      return timeout(550);
    });
    expect(result.current[0]).toStrictEqual(0);
  });

  test('start reset', async () => {
    const { result } = renderHook(() => useCountdown(0.5 * 1000, 0.1 * 1000));
    await act(async () => {
      await result.current[1]();
      return timeout(550);
    });
    expect(result.current[0]).toStrictEqual(0);

    act(() => result.current[3]());
    expect(result.current[0]).toStrictEqual(0.5 * 1000);
  });

  test('stop', async () => {
    const { result } = renderHook(() => useCountdown(0.5 * 1000, 0.1 * 1000));
    await act(async () => {
      const timeId = setTimeout(() => {
        result.current[2]();
        clearTimeout(timeId);
      }, 320);
      await result.current[1]();
      return timeout(550);
    });
    expect(result.current[0]).toStrictEqual(0.2 * 1000);
  });

  test('callback', async () => {
    const fn = jest.fn();
    const { result } = renderHook(() => useCountdown(0.5 * 1000, 0.1 * 1000, fn));
    await act(async () => {
      await result.current[1]();
      return timeout(550);
    });
    expect(fn).toHaveBeenCalled();
  });

  test('not executes if step time is negative', async () => {
    const { result } = renderHook(() => useCountdown(0.5 * 1000, -1 * 1000));
    await act(async () => {
      await result.current[1]();
      return timeout(100);
    });
    expect(result.current[0]).toStrictEqual(0.5 * 1000);
  });
});
