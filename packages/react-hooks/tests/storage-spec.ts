import { renderHook, act } from '@testing-library/react-hooks';
import { useLocalStorage } from '../src/storage/index';

/**
 * @jest-environment jsdom
 */

const TestKey: string = 'TestKey';

describe('useLocalStorage', () => {
  beforeAll(() => {
    window.localStorage.removeItem(TestKey);
  });

  test('initial value', () => {
    const { result } = renderHook(() => useLocalStorage(TestKey, 'testValue'));
    const [value] = result.current;
    expect(value).toBe('testValue');
  });

  test('existing value', () => {
    window.localStorage.setItem(TestKey, JSON.stringify('originTestValue'));
    const { result } = renderHook(() => useLocalStorage(TestKey, 'testValue'));
    const [value] = result.current;
    expect(value).toBe('originTestValue');
  });

  test('inital value on parse error', () => {
    window.localStorage.setItem(TestKey, 'invalid json');
    const { result } = renderHook(() => useLocalStorage(TestKey, 'testValue'));
    expect(result.current[0]).toBe('testValue');
  });

  test('listen on change', () => {
    const { result } = renderHook(() => useLocalStorage(TestKey, 'testValue'));
    const event = new window.StorageEvent('storage', {
      key: TestKey,
      oldValue: '"testValue"',
      newValue: '"newTestValue"',
      storageArea: window.localStorage,
    });
    act(() => {
      window.dispatchEvent(event);
    });
    expect(result.current[0]).toBe('newTestValue');
  });

  test('listen on change value parse error', () => {
    const { result } = renderHook(() => useLocalStorage(TestKey, 'testValue'));
    const event = new window.StorageEvent('storage', {
      key: TestKey,
      oldValue: '"testValue"',
      newValue: 'invalid json',
      storageArea: window.localStorage,
    });
    act(() => {
      window.dispatchEvent(event);
    });
    expect(result.current[0]).toBe('testValue');
  });

  test('listen on change value null', () => {
    const { result } = renderHook(() => useLocalStorage(TestKey, 'testValue'));
    const event = new window.StorageEvent('storage', {
      key: TestKey,
      oldValue: '"testValue"',
      newValue: null,
      storageArea: window.localStorage,
    });
    act(() => {
      window.dispatchEvent(event);
    });
    expect(result.current[0]).toBe('testValue');
  });

  test('ignore unexpected change key', () => {
    const { result } = renderHook(() => useLocalStorage(TestKey, 'testValue'));
    const event = new window.StorageEvent('storage', {
      key: 'otherKey',
      oldValue: '"value"',
      newValue: '"newValue"',
      storageArea: window.localStorage,
    });
    act(() => {
      window.dispatchEvent(event);
    });
    expect(result.current[0]).toBe('testValue');
  });

  test('ignore session storage change', () => {
    const { result } = renderHook(() => useLocalStorage(TestKey, 'testValue'));
    const event = new window.StorageEvent('storage', {
      key: TestKey,
      oldValue: '"testValue"',
      newValue: '"newTestValue"',
      storageArea: window.sessionStorage,
    });
    act(() => {
      window.dispatchEvent(event);
    });
    expect(result.current[0]).toBe('testValue');
  });

  test('set local storage value', () => {
    const { result } = renderHook(() => useLocalStorage(TestKey, 'testValue'));
    act(() => {
      result.current[1]('newTestValue');
    });
    expect(result.current[0]).toBe('newTestValue');
  });
});
