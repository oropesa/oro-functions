import fsExtra from 'fs-extra';
import {
  isString,
  isNumeric,
  objIsEmpty,
  getFilenameByPath,
  getFolderByPath,
  mergeObjectsDeep,
} from 'oro-functions-client';

export async function getFileJsonRecursively<T extends Record<string | number, any>>(
  filenameOrPath: string,
  parentDeep = 0,
): Promise<T> {
  if (!isString(filenameOrPath)) {
    return {} as any;
  }

  let deep = isNumeric(parentDeep) ? parentDeep : 0;
  const filename = getFilenameByPath(filenameOrPath);
  // eslint-disable-next-line unicorn/prefer-module
  let folder = filenameOrPath === filename ? __filename : filenameOrPath;
  let jsonOutput: T = {} as any;

  filenameOrPath === filename && (deep += 2);

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
    return {} as any;
  }

  let deep = isNumeric(parentDeep) ? parentDeep : 0;

  const filename = getFilenameByPath(filenameOrPath);
  filenameOrPath === filename && (deep += 2);
  // eslint-disable-next-line unicorn/prefer-module
  let folder = filenameOrPath === filename ? __filename : filenameOrPath;
  let jsonOutput = {} as any;

  do {
    folder = getFolderByPath(folder);
    try {
      const jsonFile = fsExtra.readJsonSync(`${folder}/${filename}`);
      jsonOutput = mergeObjectsDeep({}, jsonFile, jsonOutput);
    } catch {}

    deep--;
  } while (deep >= 0);

  return jsonOutput;
}
