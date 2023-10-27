// Console
import { processWrite, processWrites } from './console/';

// Crypto
import { cryptoGenerateKeyPair } from './crypto';

// Files
import {
  getFileJsonRecursively,
  getFileJsonRecursivelySync,
  obtainOConfig,
  obtainOConfigSync,
  obtainOroConfig,
  obtainOroConfigSync,
  globFiles,
  folderIsEmpty,
  pathIsFolder,
  zipFolder,
} from './files';

// Operating System
import { osPlatform, osIsWindows, osIsMac, osIsLinux, osIsAndroid } from './platforms/';

// Ports
import { isPortFree, isPortAvailable, getPortFree } from './ports/';

// Urls
import { jwkTokenDecode } from './urls';

// OfnClient
import { Ofn as OfnClient } from 'oro-functions-client';

export class Ofn extends OfnClient {
  // Urls
  public static jwkTokenDecode = jwkTokenDecode;

  // Crypto
  public static cryptoGenerateKeyPair = cryptoGenerateKeyPair;

  // Files
  public static obtainOConfig = obtainOConfig;
  public static obtainOConfigSync = obtainOConfigSync;
  // @deprecated
  public static obtainOroConfig = obtainOroConfig;
  // @deprecated
  public static obtainOroConfigSync = obtainOroConfigSync;
  public static getFileJsonRecursively = getFileJsonRecursively;
  public static getFileJsonRecursivelySync = getFileJsonRecursivelySync;
  public static globFiles = globFiles;
  public static folderIsEmpty = folderIsEmpty;
  public static pathIsFolder = pathIsFolder;
  public static zipFolder = zipFolder;

  // Operating System
  public static osPlatform = osPlatform;
  public static osIsWindows = osIsWindows;
  public static osIsMac = osIsMac;
  public static osIsLinux = osIsLinux;
  public static osIsAndroid = osIsAndroid;

  // Ports

  // @deprecated
  public static isPortAvailable = isPortAvailable;
  public static isPortFree = isPortFree;
  public static getPortFree = getPortFree;

  // Console
  public static processWrite = processWrite;
  public static processWrites = processWrites;
}

export default Ofn;
export * from './console/';
export * from './crypto/';
export * from './files/';
export * from './platforms/';
export * from './ports/';
export * from './urls/';

// OfnClient
export * from 'oro-functions-client';
export { Ofn as OfnClient } from 'oro-functions-client';
