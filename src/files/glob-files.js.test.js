import { sanitizePath } from 'oro-functions-client';

import { globFiles } from './glob-files';

const TEST_PATH = `${__dirname}/__tests__`;

describe('fn: globFiles', () => {
  test('fn: globFiles( undefined )', async () => {
    expect(await globFiles(undefined)).toEqual([]);
  });

  test('fn: globFiles( not str )', async () => {
    expect(await globFiles(true)).toEqual([]);
  });

  test('fn: globFiles( folderpath, wrong-params )', async () => {
    expect(await globFiles(`${TEST_PATH}/assets/*`, 'wrong-params')).toEqual(
      expect.arrayContaining([
        `${sanitizePath(TEST_PATH)}/assets/custom-config.json`,
        `${sanitizePath(TEST_PATH)}/assets/oro-config.json`,
      ]),
    );
  });
});
