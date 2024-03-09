import fsExtra from 'fs-extra';
import { isNully, isString, sanitizePath, setResponseKO, setResponseOK } from 'oro-functions-client';
import type { SResponseKOObject, SResponseOKObject } from 'oro-functions-client';
import { archiveFile, archiveFolder } from 'zip-lib';

import { pathIsFolder } from './path-is-folder';

export interface ZipFolderObject {
  zipPath: string;
}

export interface ZipFolderError {
  msg: string;
  folderPath?: string;
  zipPath?: string;
}

export type ZipFolderResponse = SResponseOKObject<ZipFolderObject> | SResponseKOObject<ZipFolderError>;

export async function zipFolder(folderPath: string, zipPath?: string): Promise<ZipFolderResponse> {
  if (!isString(folderPath)) {
    return setResponseKO('zipFolder failed, param:folderPath is string required.');
  }

  let folderDirectory = sanitizePath(folderPath);
  const zipFile = isNully(zipPath)
    ? `${folderDirectory.slice(-1) === '/' ? folderDirectory.slice(0, -1) : folderDirectory}.zip`
    : zipPath;

  if (!isString(zipFile)) {
    return setResponseKO('zipFolder failed, param:zipPath is string required.');
  }

  if (!(await fsExtra.exists(folderDirectory))) {
    return setResponseKO('zipFolder failed, folderPath not exist.', {
      folderPath: folderDirectory,
    });
  }

  await fsExtra.remove(zipFile);

  if (await pathIsFolder(folderDirectory)) {
    folderDirectory.slice(-1) !== '/' && (folderDirectory += '/');

    if (zipFile.includes(folderDirectory)) {
      return setResponseKO('zipFolder Error: Source and target folder must be different.', {
        folderPath: folderDirectory,
        zipPath: zipFile,
      });
    }

    const response = await archiveFolder(folderDirectory, zipFile)
      .then(() => setResponseOK())
      .catch((error: Error) =>
        setResponseKO(`zipFolder ${error.toString()}`, {
          folderPath: folderDirectory,
          zipPath: zipFile,
        }),
      );

    if (!response.status) {
      return response;
    }
  } else {
    const response = await archiveFile(folderDirectory, zipFile)
      .then(() => setResponseOK())
      .catch((error: Error) =>
        setResponseKO(`zipFolder ${error.toString()}`, {
          folderPath: folderDirectory,
          zipPath: zipFile,
        }),
      );

    if (!response.status) {
      return response;
    }
  }

  return (await fsExtra.exists(zipFile))
    ? setResponseOK({ zipPath: zipFile })
    : setResponseKO('File zip not exists (maybe for permissions issue).', {
        zipPath: zipFile,
      });
}
