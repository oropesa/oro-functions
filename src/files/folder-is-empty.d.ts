import { GlobFilesOptions } from './glob-files';

export type folderIsEmpty = (
  folderPath: string,
  globArgs?: GlobFilesOptions,
) => Promise<boolean>;