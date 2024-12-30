import { pathExists } from './path-exists';

// eslint-disable-next-line unicorn/prefer-module
const TEST_PATH = `${__dirname}/__tests__`;

describe('fn: pathExists', () => {
  test('fn: pathExists( str bad )', async () => {
    expect(await pathExists('chacho')).toBe(false);
  });

  test('fn: pathExists( folderpath )', async () => {
    expect(await pathExists(`${TEST_PATH}/assets`)).toBe(true);
  });

  test('fn: pathExists( folderpath2 )', async () => {
    expect(await pathExists(`${TEST_PATH}/assets/`)).toBe(true);
  });

  test('fn: pathExists( filepath )', async () => {
    expect(await pathExists(`${TEST_PATH}/assets/oro-config.json`)).toBe(true);
  });
});
