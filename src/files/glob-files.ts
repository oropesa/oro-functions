import fglob from 'fast-glob';
import type { Options } from 'fast-glob';
import { isArray, isObject, isString, sanitizePath } from 'oro-functions-client';

export type GlobFilesOptions = Options;

export async function globFiles(folderPath: string | string[], globArgs: GlobFilesOptions = {}): Promise<string[]> {
  if (!isString(folderPath) && !isArray(folderPath)) {
    return [];
  }

  const args: GlobFilesOptions = {
    dot: true,
    unique: true,
    onlyFiles: true,
    ignore: ['node_modules/**', '.zero/**'],
    ...(isObject(globArgs) ? globArgs : {}),
  };

  const folderDirectory = isString(folderPath)
    ? sanitizePath(folderPath)
    : folderPath.map((path) => sanitizePath(path));

  return fglob(folderDirectory, args);
}
