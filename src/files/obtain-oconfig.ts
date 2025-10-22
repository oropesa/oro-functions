import {
  arrayGetUnique,
  getFilenameByPath,
  getFolderByPath,
  isArray,
  isObject,
  setResponseKO,
  setResponseOK,
} from 'oro-functions-client';
import type { SResponseKOObject, SResponseOKObject } from 'oro-functions-client';

import { getFileJsonRecursively, getFileJsonRecursivelySync } from './get-file-json-recursively';

export interface OConfigArgs {
  file?: string;
  deep?: number;
  defaultParams?: string[];
  extraParams?: string[];
}

export interface OConfigDefaultParams {
  environment: string;
  projectname: string;
  projectserver: string;
}

export interface OConfigObject<T extends Record<string, any> = OConfigDefaultParams> {
  config: T;
}

export interface OConfigError {
  msg: string;
  args?: OConfigArgs;
}

export type OConfigResponse<T extends Record<string, any> = OConfigDefaultParams> =
  | SResponseOKObject<OConfigObject<T>>
  | SResponseKOObject<OConfigError>;

export async function obtainOConfig<T extends Record<string, any> = OConfigDefaultParams>(
  args: OConfigArgs = {},
): Promise<OConfigResponse<T>> {
  if (!isObject(args)) {
    return setResponseKO('obtainOConfig args failed: must be an object.', { args });
  }

  const {
    file = 'oconfig.json',
    deep = 0,
    defaultParams = ['environment', 'projectname', 'projectserver'],
    extraParams = [],
  } = args;

  const filename = getFilenameByPath(file);
  const filepath = filename === file ? getFolderByPath(getFolderByPath(__dirname)) : getFolderByPath(file);
  const params = arrayGetUnique([
    ...(isArray(defaultParams) ? defaultParams : []),
    ...(isArray(extraParams) ? extraParams : []),
  ]);

  const config = await getFileJsonRecursively<T>(file, deep);

  for (const param of params) {
    if (!(param in config)) {
      return setResponseKO(`Miss param:${param} on ${filepath}/${filename} deep ${deep}`, {
        args: { file, deep, defaultParams, extraParams },
      });
    }
  }

  return setResponseOK({ config: config as T });
}

export function obtainOConfigSync<T extends Record<string, any> = OConfigDefaultParams>(
  args: OConfigArgs = {},
): OConfigResponse<T> {
  if (!isObject(args)) {
    return setResponseKO('obtainOConfigSync args failed: must be an object.', { args });
  }

  const {
    file = 'oconfig.json',
    deep = 0,
    defaultParams = ['environment', 'projectname', 'projectserver'],
    extraParams = [],
  } = args;

  const filename = getFilenameByPath(file);
  const filepath = filename === file ? getFolderByPath(getFolderByPath(__dirname)) : getFolderByPath(file);
  const params = arrayGetUnique([
    ...(isArray(defaultParams) ? defaultParams : []),
    ...(isArray(extraParams) ? extraParams : []),
  ]);

  const config = getFileJsonRecursivelySync(file, deep);

  for (const param of params) {
    if (!(param in config)) {
      return setResponseKO(`Miss param:${param} on ${filepath}/${filename} deep ${deep}`, {
        args: { file, deep, defaultParams, extraParams },
      });
    }
  }

  return setResponseOK({ config: config as T });
}

/**
 * @deprecated use obtainOConfig with 'oconfig.json' as default file
 */
export async function obtainOroConfig<T extends Record<string, any> = OConfigDefaultParams>(
  args: OConfigArgs = {},
): Promise<OConfigResponse<T>> {
  return await obtainOConfig<T>({ file: 'oro-config.json', ...args });
}

/**
 * @deprecated use obtainOConfigSync with 'oconfig.json' as default file
 */
export function obtainOroConfigSync<T extends Record<string, any> = OConfigDefaultParams>(
  args: OConfigArgs = {},
): OConfigResponse<T> {
  return obtainOConfigSync<T>({ file: 'oro-config.json', ...args });
}
