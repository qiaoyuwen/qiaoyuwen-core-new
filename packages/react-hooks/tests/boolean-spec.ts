import { renderHook, act } from '@testing-library/react-hooks';
import { useBoolean, useSwitch } from '../src/boolean/index';

describe('useBoolean', () => {
  test('valid return type', () => {
    const { result } = renderHook(() => useBoolean());
    const [value, methods] = result.current;
    expect(value).toBe(false);
    expect(typeof methods.setTrue).toBe('function');
    expect(typeof methods.setFalse).toBe('function');
    expect(typeof methods.toggle).toBe('function');
  });

  test('initial value true', () => {
    const { result } = renderHook(() => useBoolean(true));
    const [value] = result.current;
    expect(value).toBe(true);
  });

  test('setTrue', () => {
    const { result } = renderHook(() => useBoolean(false));
    act(() => result.current[1].setTrue());
    const [value] = result.current;
    expect(value).toBe(true);
  });

  test('setFalse', () => {
    const { result } = renderHook(() => useBoolean(true));
    act(() => result.current[1].setFalse());
    const [value] = result.current;
    expect(value).toBe(false);
  });

  test('toggle', () => {
    const { result } = renderHook(() => useBoolean(false));
    act(() => result.current[1].toggle());
    const [value] = result.current;
    expect(value).toBe(true);
  });
});

describe('useSwitch', () => {
  test('valid return type', () => {
    const { result } = renderHook(() => useSwitch());
    const [value, { on, off, toggle }] = result.current;
    expect(value).toBe(false);
    expect(typeof on).toBe('function');
    expect(typeof off).toBe('function');
    expect(typeof toggle).toBe('function');
  });

  test('initial value', () => {
    const { result } = renderHook(() => useSwitch(true));
    const [value] = result.current;
    expect(value).toBe(true);
  });

  test('on', () => {
    const { result } = renderHook(() => useSwitch(false));
    act(() => result.current[1].on());
    expect(result.current[0]).toBe(true);
  });

  test('off', () => {
    const { result } = renderHook(() => useSwitch(true));
    act(() => result.current[1].off());
    expect(result.current[0]).toBe(false);
  });

  test('toggle', () => {
    const { result } = renderHook(() => useSwitch(false));
    act(() => result.current[1].toggle());
    expect(result.current[0]).toBe(true);
  });
});
