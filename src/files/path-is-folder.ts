import fsExtra from 'fs-extra';
import { isString } from 'oro-functions-client';

export async function pathIsFolder(path: string): Promise<boolean> {
  if (!isString(path)) {
    return false;
  }

  return (await fsExtra.exists(path)) && fsExtra.statSync(path).isDirectory();
}
