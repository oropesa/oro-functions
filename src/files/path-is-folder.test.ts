import { pathIsFolder } from './path-is-folder';

// eslint-disable-next-line unicorn/prefer-module
const TEST_PATH = `${__dirname}/__tests__`;

describe('fn: pathIsFolder', () => {
  test('fn: pathIsFolder( str bad )', async () => {
    expect(await pathIsFolder('chacho')).toBe(false);
  });

  test('fn: pathIsFolder( folderpath )', async () => {
    expect(await pathIsFolder(`${TEST_PATH}/assets`)).toBe(true);
  });

  test('fn: pathIsFolder( folderpath2 )', async () => {
    expect(await pathIsFolder(`${TEST_PATH}/assets/`)).toBe(true);
  });

  test('fn: pathIsFolder( filepath )', async () => {
    expect(await pathIsFolder(`${TEST_PATH}/assets/oro-config.json`)).toBe(false);
  });
});
