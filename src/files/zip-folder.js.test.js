import { sanitizePath } from 'oro-functions-client';

import { zipFolder } from './zip-folder';

const TEST_PATH = `${__dirname}/__tests__`;

describe('fn: zipFolder', () => {
  test('fn: zipFolder( undefined )', async () => {
    expect(await zipFolder(undefined)).toEqual({
      status: false,
      error: { msg: 'zipFolder failed, param:folderPath is string required.' },
    });
  });

  test('fn: zipFolder( undefined )', async () => {
    const folderPath = `${sanitizePath(TEST_PATH)}/assets-js/prj99`;
    expect(await zipFolder(folderPath, true)).toEqual({
      status: false,
      error: { msg: 'zipFolder failed, param:zipPath is string required.' },
    });
  });
});
