import { uid } from '../../index';
describe('uid', () => {
  it('default length', () => {
    expect(11).toBe(uid().length);
  });

  it('specified length', () => {
    expect(32).toBe(uid(32).length);
  });
});
