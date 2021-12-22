const getType = (obj: unknown) => Object.prototype.toString.call(obj);
const isType =
  <T>(type: string | string[]) =>
  (obj: unknown): obj is T =>
    (Array.isArray(type) ? type : [type]).some((t) => getType(obj) === `[object ${t}]`);

export const isFn = isType<(...args: unknown[]) => unknown>(['Function', 'AsyncFunction', 'GeneratorFunction']);
export const isWindow = isType<Window>(['Window', 'global']);
export const isNull = (val: unknown) => val === null;
export const isUndefined = (val: unknown) => val === undefined;
export const isNil = (val: unknown) => val === null || val === undefined;
export const isHTMLElement = (obj: unknown & { nodeName?: unknown; tagName?: unknown }): obj is HTMLElement => {
  return !!obj?.nodeName || !!obj?.tagName;
};
export const isArr = Array.isArray;
export const isPlainObj = isType<object>('Object');
export const isStr = isType<string>('String');
export const isBool = isType<boolean>('Boolean');
export const isNum = isType<number>('Number');
export const isObj = (val: unknown): val is object => typeof val === 'object';
export const isRegExp = isType<RegExp>('RegExp');
export const isValid = (val: unknown) => val !== null && val !== undefined;
