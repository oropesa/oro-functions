import { Options } from 'fast-glob';

export type GlobFilesOptions = Options;

export type globFiles = (
  folderPath: string | string[],
  globArgs?: GlobFilesOptions,
) => Promise<string[]>;