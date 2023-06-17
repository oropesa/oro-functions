import OfnClient from 'oro-functions-client';

import {
    // Urls
    jwkTokenDecode,

    // Crypto
    cryptoGenerateKeyPair,

    // Files
    obtainOConfig,
    obtainOConfigSync,
    obtainOroConfig,
    obtainOroConfigSync,
    getFileJsonRecursively,
    getFileJsonRecursivelySync,
    globFiles,
    folderIsEmpty,
    pathIsFolder,
    zipFolder,

    // Operating System
    osPlatform,
    osIsWindows,
    osIsMac,
    osIsLinux,

    // Ports
    isPortAvailable,
    isPortFree,
    getPortFree,

    // Console
    processWrite,
    processWrites,

} from './src';

export {
    CryptoKeyPairOptions,
    CryptoKeyPairObject,
    CryptoKeyPairError,
    CryptoKeyPairResponse,

    OConfigArgs,
    OConfigDefaultParams,
    OConfigObject,
    OConfigError,
    OConfigResponse,

    ZipFolderObject,
    ZipFolderError,
    ZipFolderResponse,

    PortFreeObject,
    GetPortFreeError,
    GetPortFreeResponse,
    IsPortFreeError,
    IsPortFreeResponse,
} from './src'

declare class Ofn extends OfnClient {

    //region URLs

    static jwkTokenDecode: jwkTokenDecode;

    //endregion
    //region Crypto

    static cryptoGenerateKeyPair: cryptoGenerateKeyPair;

    //endregion
    //region Files

    static obtainOConfig: obtainOConfig;
    static obtainOConfigSync: obtainOConfigSync;
    static obtainOroConfig: obtainOroConfig;
    static obtainOroConfigSync: obtainOroConfigSync;
    static getFileJsonRecursively: getFileJsonRecursively;
    static getFileJsonRecursivelySync: getFileJsonRecursivelySync;
    static globFiles: globFiles;
    static folderIsEmpty: folderIsEmpty;
    static pathIsFolder: pathIsFolder;
    static zipFolder: zipFolder;

    //endregion
    //region Operating System

    static osPlatform: osPlatform;
    static osIsWindows: osIsWindows;
    static osIsMac: osIsMac;
    static osIsLinux: osIsLinux;

    //endregion
    //region Ports

    static isPortAvailable: isPortAvailable;
    static isPortFree: isPortFree;
    static getPortFree: getPortFree;

    //endregion
    //region Console

    static processWrite: processWrite;
    static processWrites: processWrites;

    //endregion
}

export default Ofn;