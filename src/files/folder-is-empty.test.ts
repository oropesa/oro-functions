import { folderIsEmpty } from './folder-is-empty';

// eslint-disable-next-line unicorn/prefer-module
const TEST_PATH = `${__dirname}/__tests__`;

describe('fn: folderIsEmpty', () => {
  test('fn: folderIsEmpty( folderpath )', async () => {
    expect(await folderIsEmpty(`${TEST_PATH}/assets/*`)).toBe(false);
  });

  test('fn: folderIsEmpty( folderpath, args )', async () => {
    expect(await folderIsEmpty(`${TEST_PATH}/assets/*`, { ignore: ['**.json', '**.zip'] })).toBe(true);
  });
});
