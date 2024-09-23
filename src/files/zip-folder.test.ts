import fsExtra from 'fs-extra';
import { sanitizePath } from 'oro-functions-client';

import { zipFolder } from './zip-folder';

const TEST_PATH = sanitizePath(`${__dirname}/__tests__`);

describe('fn: zipFolder', () => {
  test('fn: zipFolder( str bad )', async () => {
    const folderPath = `${TEST_PATH}/assets/prj99`;

    expect(await zipFolder(folderPath)).toEqual({
      status: false,
      error: { msg: 'zipFolder failed, folderPath not exist.', folderPath },
    });
  });

  test('fn: zipFolder( folderpath )', async () => {
    const folderPath = `${TEST_PATH}/assets/prj1`;
    const zipPath = `${TEST_PATH}/assets/prj1.zip`;

    expect(await zipFolder(folderPath)).toEqual({ status: true, zipPath });

    await fsExtra.remove(`${TEST_PATH}/assets/prj1.zip`);
  });

  test('fn: zipFolder( folderpath slash-ending )', async () => {
    const folderPath = `${TEST_PATH}/assets/prj1/`;
    const zipPath = `${TEST_PATH}/assets/prj1.zip`;

    expect(await zipFolder(folderPath)).toEqual({ status: true, zipPath });

    await fsExtra.remove(`${TEST_PATH}/assets/prj1.zip`);
  });

  test('fn: zipFolder( folderpath, zipPath self )', async () => {
    const folderPath = `${TEST_PATH}/assets/prj1/`;
    const zipPath = `${TEST_PATH}/assets/prj1/prj.zip`;

    const zipResponse = await zipFolder(folderPath, zipPath);
    expect(zipResponse).toEqual({
      status: false,
      error: {
        msg: 'zipFolder Error: Source and target folder must be different.',
        folderPath,
        zipPath,
      },
    });
  });

  test('fn: zipFolder( folderpath, zipPath )', async () => {
    const folderPath = `${TEST_PATH}/assets/prj1`;
    const zipPath = `${TEST_PATH}/assets/prj-ts.zip`;

    const zipResponse = await zipFolder(folderPath, zipPath);
    expect(zipResponse).toEqual({ status: true, zipPath });

    await fsExtra.remove(zipPath);
  });

  test('fn: zipFolder( filepath )', async () => {
    const folderPath = `${TEST_PATH}/assets/oro-config.json`;
    const zipPath = `${TEST_PATH}/assets/oro-config.json.zip`;

    const zipResponse = await zipFolder(folderPath, zipPath);
    expect(zipResponse).toEqual({ status: true, zipPath });

    await fsExtra.remove(`${TEST_PATH}/assets/oro-config.json.zip`);
  });

  test('fn: zipFolder( folderpath ) zip-error', async () => {
    const folderPath = `${TEST_PATH}/assets/prj1`;
    const zipPath = `${TEST_PATH}/assets/prj1.zip`;

    expect(await zipFolder(folderPath)).toEqual({ status: true, zipPath });

    await fsExtra.remove(`${TEST_PATH}/assets/prj1.zip`);
  });
});
