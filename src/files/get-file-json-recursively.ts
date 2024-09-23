import fsExtra from 'fs-extra';
import {
  getFilenameByPath,
  getFolderByPath,
  isNumeric,
  isString,
  mergeObjectsDeep,
  objIsEmpty,
} from 'oro-functions-client';

export async function getFileJsonRecursively<T extends Record<string | number, any>>(
  filenameOrPath: string,
  parentDeep = 0,
): Promise<T> {
  if (!isString(filenameOrPath)) {
    return {} as unknown as T;
  }

  let deep = isNumeric(parentDeep) ? parentDeep : 0;
  const filename = getFilenameByPath(filenameOrPath);
  let folder = filenameOrPath === filename ? __filename : filenameOrPath;
  let jsonOutput: T = {} as unknown as T;

  if (filenameOrPath === filename) {
    deep += 2;
  }

  do {
    folder = getFolderByPath(folder);
    const jsonFile = await fsExtra.readJson(`${folder}/${filename}`).catch(() => {});
    if (!objIsEmpty(jsonFile)) {
      jsonOutput = mergeObjectsDeep<T>(jsonFile, jsonOutput);
    }

    deep--;
  } while (deep >= 0);

  return jsonOutput;
}

export function getFileJsonRecursivelySync<T extends Record<string | number, any>>(
  filenameOrPath: string,
  parentDeep = 0,
): T {
  if (!isString(filenameOrPath)) {
    return {} as unknown as T;
  }

  let deep = isNumeric(parentDeep) ? parentDeep : 0;

  const filename = getFilenameByPath(filenameOrPath);

  if (filenameOrPath === filename) {
    deep += 2;
  }

  let folder = filenameOrPath === filename ? __filename : filenameOrPath;
  let jsonOutput = {} as unknown as T;

  do {
    folder = getFolderByPath(folder);
    try {
      const jsonFile = fsExtra.readJsonSync(`${folder}/${filename}`);
      jsonOutput = mergeObjectsDeep<T>({}, jsonFile, jsonOutput);
    } catch {}

    deep--;
  } while (deep >= 0);

  return jsonOutput;
}
