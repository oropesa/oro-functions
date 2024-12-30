import fsExtra from 'fs-extra';
import { isString } from 'oro-functions-client';

export async function pathExists(path: string): Promise<boolean> {
  if (!isString(path)) {
    return false;
  }

  return await fsExtra.pathExists(path);
}
