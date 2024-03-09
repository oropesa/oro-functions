import { isObject, isString, sanitizePath } from 'oro-functions-client';

import { globFiles } from './glob-files';
import type { GlobFilesOptions } from './glob-files';

export async function folderIsEmpty(folderPath: string, globArgs: GlobFilesOptions = {}): Promise<boolean> {
  if (!isString(folderPath)) {
    return false;
  }

  const args = {
    dot: true,
    unique: true,
    onlyFiles: true,
    ignore: ['node_modules/**', '.zero/**'],
    ...(isObject(globArgs) ? globArgs : {}),
  };

  const files = await globFiles(sanitizePath(folderPath), args);
  return files.length === 0;
}
