// OfnClient
import { Ofn as OfnClient } from 'oro-functions-client';

// Commands
import { execCommand, execCommandShell } from './commands';
// Console
import {
  printDone,
  printError,
  printInfo,
  printSuccess,
  printText,
  printWarn,
  processWrite,
  processWrites,
} from './console';
// Crypto
import { cryptoGenerateKeyPair } from './crypto';
// Files
import {
  folderIsEmpty,
  getFileJsonRecursively,
  getFileJsonRecursivelySync,
  globFiles,
  obtainOConfig,
  obtainOConfigSync,
  obtainOroConfig,
  obtainOroConfigSync,
  pathIsFolder,
  zipFolder,
} from './files';
// Operating System
import { osIsAndroid, osIsLinux, osIsMac, osIsWindows, osPlatform } from './platforms';
// Ports
import { getPortFree, isPortAvailable, isPortFree } from './ports';
// Urls
import { jwkTokenDecode } from './urls';

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
  public static printText = printText;
  public static printInfo = printInfo;
  public static printError = printError;
  public static printWarn = printWarn;
  public static printSuccess = printSuccess;
  public static printDone = printDone;

  // Commands
  public static execCommand = execCommand;
  public static execCommandShell = execCommandShell;
}
