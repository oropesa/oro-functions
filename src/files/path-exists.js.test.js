import { pathExists } from './path-exists';

describe('fn: pathExists', () => {
  test('fn: pathExists( undefined )', async () => {
    expect(await pathExists(undefined)).toBe(false);
  });
});
