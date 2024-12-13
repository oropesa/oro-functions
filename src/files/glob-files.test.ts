import { sanitizePath } from 'oro-functions-client';

import { globFiles } from './glob-files';

// eslint-disable-next-line unicorn/prefer-module
const TEST_PATH = `${__dirname}/__tests__`;

describe('fn: globFiles', () => {
  test('fn: globFiles( folderpath )', async () => {
    expect(await globFiles(`${TEST_PATH}/assets/*`)).toEqual(
      expect.arrayContaining([
        `${sanitizePath(TEST_PATH)}/assets/custom-config.json`,
        `${sanitizePath(TEST_PATH)}/assets/oro-config.json`,
      ]),
    );
  });

  test('fn: globFiles( folderpath-recursive )', async () => {
    expect(await globFiles(`${TEST_PATH}/assets/**`)).toEqual(
      expect.arrayContaining([
        `${sanitizePath(TEST_PATH)}/assets/custom-config.json`,
        `${sanitizePath(TEST_PATH)}/assets/oro-config.json`,
        `${sanitizePath(TEST_PATH)}/assets/prj1/.gitignore`,
        `${sanitizePath(TEST_PATH)}/assets/prj1/custom-config.json`,
        `${sanitizePath(TEST_PATH)}/assets/prj1/oro-config.json`,
      ]),
    );
  });

  test('fn: globFiles( folderpath, onlyFiles none )', async () => {
    expect(await globFiles(`${TEST_PATH}/assets/*`, { onlyFiles: false })).toEqual(
      expect.arrayContaining([
        `${sanitizePath(TEST_PATH)}/assets/custom-config.json`,
        `${sanitizePath(TEST_PATH)}/assets/oro-config.json`,
        `${sanitizePath(TEST_PATH)}/assets/prj1`,
      ]),
    );
  });

  test('fn: globFiles( folderpath, onlyDirectories )', async () => {
    expect(
      await globFiles(`${TEST_PATH}/assets/*`, {
        onlyFiles: false,
        onlyDirectories: true,
      }),
    ).toEqual([`${sanitizePath(TEST_PATH)}/assets/prj1`]);
  });

  test('fn: globFiles( folderpath array )', async () => {
    expect(await globFiles([`${TEST_PATH}/assets/*`, `${TEST_PATH}/assets/prj1/*`])).toEqual(
      expect.arrayContaining([
        `${sanitizePath(TEST_PATH)}/assets/custom-config.json`,
        `${sanitizePath(TEST_PATH)}/assets/oro-config.json`,
        `${sanitizePath(TEST_PATH)}/assets/prj1/.gitignore`,
        `${sanitizePath(TEST_PATH)}/assets/prj1/custom-config.json`,
        `${sanitizePath(TEST_PATH)}/assets/prj1/oro-config.json`,
      ]),
    );
  });
});
