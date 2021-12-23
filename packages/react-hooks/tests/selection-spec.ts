import { renderHook, act } from '@testing-library/react-hooks';
import { useSelection } from '../src/selection/index';

describe('useSelection', () => {
  test('valid return type', () => {
    const { result } = renderHook(() => useSelection([1, 2, 3]));
    const [selections, singleMethods, allMethods] = result.current;
    expect(selections).toStrictEqual(new Set());
    expect(typeof singleMethods.isSelected).toBe('function');
    expect(typeof singleMethods.select).toBe('function');
    expect(typeof singleMethods.unSelect).toBe('function');
    expect(typeof singleMethods.toggle).toBe('function');
    expect(typeof allMethods.allSelected).toBe('boolean');
    expect(typeof allMethods.noneSelected).toBe('boolean');
    expect(typeof allMethods.partiallySelected).toBe('boolean');
    expect(typeof allMethods.selectAll).toBe('function');
    expect(typeof allMethods.unSelectAll).toBe('function');
    expect(typeof allMethods.toggleAll).toBe('function');
  });

  test('initial value true', () => {
    const { result } = renderHook(() => useSelection([1], [1]));
    const [value] = result.current;
    expect(value).toStrictEqual(new Set([1]));
  });

  test('isSelected', () => {
    const { result } = renderHook(() => useSelection([1, 2, 3], [1]));
    expect(result.current[1].isSelected(1)).toBe(true);
  });

  test('select', () => {
    const { result } = renderHook(() => useSelection([1, 2, 3]));
    act(() => result.current[1].select(2));
    expect(result.current[0]).toStrictEqual(new Set([2]));
  });

  test('unSelect', () => {
    const { result } = renderHook(() => useSelection([1, 2, 3], [1, 2]));
    act(() => result.current[1].unSelect(2));
    expect(result.current[0]).toStrictEqual(new Set([1]));
  });

  test('toggle', () => {
    const { result } = renderHook(() => useSelection([1, 2, 3], [1, 2]));
    act(() => result.current[1].toggle(2));
    expect(result.current[0]).toStrictEqual(new Set([1]));

    act(() => result.current[1].toggle(2));
    expect(result.current[0]).toStrictEqual(new Set([1, 2]));
  });

  test('selectAll', () => {
    const { result } = renderHook(() => useSelection([1, 2, 3]));
    act(() => result.current[2].selectAll());
    expect(result.current[0]).toStrictEqual(new Set([1, 2, 3]));
  });

  test('unSelectAll', () => {
    const { result } = renderHook(() => useSelection([1, 2, 3], [1, 2]));
    act(() => result.current[2].unSelectAll());
    expect(result.current[0]).toStrictEqual(new Set());
  });

  test('toggleAll', () => {
    const { result } = renderHook(() => useSelection([1, 2, 3], [1, 2]));
    act(() => result.current[2].toggleAll());
    expect(result.current[0]).toStrictEqual(new Set([1, 2, 3]));

    act(() => result.current[2].toggleAll());
    expect(result.current[0]).toStrictEqual(new Set([]));
  });

  test('noneSelected', () => {
    const { result } = renderHook(() => useSelection([1, 2, 3], []));
    expect(result.current[2].noneSelected).toBe(true);
  });

  test('allSelected', () => {
    const { result } = renderHook(() => useSelection([1, 2, 3], [1, 2, 3]));
    expect(result.current[2].allSelected).toBe(true);
  });

  test('partiallySelected', () => {
    const { result } = renderHook(() => useSelection([1, 2, 3], [1, 2]));
    expect(result.current[2].partiallySelected).toBe(true);
  });
});
