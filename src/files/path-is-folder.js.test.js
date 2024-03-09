import { pathIsFolder } from './path-is-folder';

describe('fn: pathIsFolder', () => {
  test('fn: pathIsFolder( undefined )', async () => {
    expect(await pathIsFolder(undefined)).toBe(false);
  });
});
