import { folderIsEmpty } from './folder-is-empty';

const TEST_PATH = `${__dirname}/__tests__`;

describe('fn: folderIsEmpty', () => {
  test('fn: folderIsEmpty( undefined )', async () => {
    expect(await folderIsEmpty(undefined)).toBe(false);
  });

  test('fn: folderIsEmpty( not str )', async () => {
    expect(await folderIsEmpty(true)).toBe(false);
  });

  test('fn: folderIsEmpty( folderpath, wrong param )', async () => {
    expect(await folderIsEmpty(`${TEST_PATH}/assets/*`, 'wrong-param')).toBe(false);
  });
});
