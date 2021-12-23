import { renderHook, act } from '@testing-library/react-hooks';
import { useCounter } from '../src/number/index';

describe('useCounter', () => {
  test('valid return type', () => {
    const { result } = renderHook(() => useCounter());
    const [value, methods] = result.current;
    expect(value).toBe(0);
    expect(typeof methods.inc).toBe('function');
    expect(typeof methods.dec).toBe('function');
    expect(typeof methods.reset).toBe('function');
  });

  test('initial value true', () => {
    const { result } = renderHook(() => useCounter(1));
    const [value] = result.current;
    expect(value).toBe(1);
  });

  test('inc', () => {
    const { result } = renderHook(() => useCounter());
    act(() => result.current[1].inc());
    const [value] = result.current;
    expect(value).toBe(1);
  });

  test('dec', () => {
    const { result } = renderHook(() => useCounter(1));
    act(() => result.current[1].dec());
    const [value] = result.current;
    expect(value).toBe(0);
  });

  test('reset', () => {
    const { result } = renderHook(() => useCounter());
    act(() => result.current[1].reset(10));
    const [value] = result.current;
    expect(value).toBe(10);
  });
});
