import fsExtra from 'fs-extra';
import { isString } from 'oro-functions-client';

export async function pathIsFile(path: string): Promise<boolean> {
  if (!isString(path)) {
    return false;
  }

  return await fsExtra
    .stat(path)
    .then((s) => s.isFile())
    .catch(() => false);
}
