import { pathIsFile } from './path-is-file';

describe('fn: pathIsFile', () => {
  test('fn: pathIsFile( undefined )', async () => {
    expect(await pathIsFile(undefined)).toBe(false);
  });
});
