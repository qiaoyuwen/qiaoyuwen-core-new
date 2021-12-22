import {
  isFn,
  isWindow,
  isNull,
  isUndefined,
  isNil,
  isHTMLElement,
  isArr,
  isPlainObj,
  isStr,
  isNum,
  isBool,
  isObj,
  isRegExp,
  isValid,
} from '../src/index';
describe('types', () => {
  it('isFn', () => {
    const arrayFn = () => {};
    expect(isFn(arrayFn)).toBeTruthy();
  });

  it('isWindow', () => {
    expect(isWindow(window)).toBeTruthy();
  });

  it('isNull', () => {
    expect(isNull(null)).toBeTruthy();
  });

  it('isUndefined', () => {
    expect(isUndefined(undefined)).toBeTruthy();
  });

  it('isNil', () => {
    expect(isNil(null)).toBeTruthy();
    expect(isNil(undefined)).toBeTruthy();
  });

  it('isHTMLElement', () => {
    const div = document.createElement('div');
    expect(isHTMLElement(div)).toBeTruthy();
    expect(
      isHTMLElement({
        nodeName: 'div',
      }),
    ).toBeTruthy();
    expect(
      isHTMLElement({
        tagName: 'div',
      }),
    ).toBeTruthy();
    expect(isHTMLElement(null)).toBeFalsy();
  });

  it('isArr', () => {
    expect(isArr([])).toBeTruthy();
  });

  it('isPlainObj', () => {
    expect(isPlainObj({})).toBeTruthy();
  });

  it('isStr', () => {
    expect(isStr('')).toBeTruthy();
  });

  it('isNum', () => {
    expect(isNum(0)).toBeTruthy();
  });

  it('isBool', () => {
    expect(isBool(true)).toBeTruthy();
  });

  it('isObj', () => {
    expect(isObj({})).toBeTruthy();
  });

  it('isRegExp', () => {
    expect(isRegExp(/1/)).toBeTruthy();
  });

  it('isValid', () => {
    expect(isValid(null)).toBeFalsy();
    expect(isValid(undefined)).toBeFalsy();
  });
});
