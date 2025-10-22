import { pathIsFile } from './path-is-file';

const TEST_PATH = `${__dirname}/__tests__`;

describe('fn: pathIsFile', () => {
  test('fn: pathIsFile( str bad )', async () => {
    expect(await pathIsFile('chacho')).toBe(false);
  });

  test('fn: pathIsFile( folderpath )', async () => {
    expect(await pathIsFile(`${TEST_PATH}/assets`)).toBe(false);
  });

  test('fn: pathIsFile( folderpath2 )', async () => {
    expect(await pathIsFile(`${TEST_PATH}/assets/`)).toBe(false);
  });

  test('fn: pathIsFile( filepath )', async () => {
    expect(await pathIsFile(`${TEST_PATH}/assets/oro-config.json`)).toBe(true);
  });
});
