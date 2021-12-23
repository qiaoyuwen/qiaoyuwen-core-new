import { renderHook, act } from '@testing-library/react-hooks';
import { useLocalStorage } from '../src/storage/index';

/**
 * @jest-environment jsdom
 */

describe('useLocalStorage', () => {
  test('initial value', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'testValue'));
    const [value] = result.current;
    expect(value).toBe('testValue');
  });

  test('existing value', () => {
    window.localStorage.setItem('testKey', JSON.stringify('originTestValue'));
    const { result } = renderHook(() => useLocalStorage('testKey', 'testValue'));
    const [value] = result.current;
    expect(value).toBe('originTestValue');
  });

  test('inital value on parse error', () => {
    window.localStorage.setItem('testKey', 'invalid json');
    const { result } = renderHook(() => useLocalStorage('testKey', 'testValue'));
    expect(result.current[0]).toBe('testValue');
  });

  test('listen on change', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'testValue'));
    const event = new window.StorageEvent('storage', {
      key: 'testKey',
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
    const { result } = renderHook(() => useLocalStorage('testKey', 'testValue'));
    const event = new window.StorageEvent('storage', {
      key: 'testKey',
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
    const { result } = renderHook(() => useLocalStorage('testKey', 'testValue'));
    const event = new window.StorageEvent('storage', {
      key: 'testKey',
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
    const { result } = renderHook(() => useLocalStorage('testKey', 'testValue'));
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
    const { result } = renderHook(() => useLocalStorage('testKey', 'testValue'));
    const event = new window.StorageEvent('storage', {
      key: 'testKey',
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
    const { result } = renderHook(() => useLocalStorage('testKey', 'testValue'));
    act(() => {
      result.current[1]('newTestValue');
    });
    expect(result.current[0]).toBe('newTestValue');
  });
});
