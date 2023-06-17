// Urls
const { jwkTokenDecode } = require( './urls/jwk-token-decode' );

// Crypto
const { cryptoGenerateKeyPair } = require( './crypto/crypto-generate-key-pair' );

// Files
const { getFileJsonRecursively, getFileJsonRecursivelySync } = require( './files/get-file-json-recursively' );
const {
    obtainOConfig,
    obtainOConfigSync,
    obtainOroConfig,
    obtainOroConfigSync,
} = require( './files/obtain-oro-config' );
const { globFiles } = require( './files/glob-files' );
const { folderIsEmpty } = require( './files/folder-is-empty' );
const { pathIsFolder } = require( './files/path-is-folder' );
const { zipFolder } = require( './files/zip-folder' );

// Operating System
const { osPlatform } = require( './platforms/os-platform' );
const { osIsWindows } = require( './platforms/os-is-windows' );
const { osIsMac } = require( './platforms/os-is-mac' );
const { osIsLinux } = require( './platforms/os-is-linux' );

// Ports
const { isPortFree, isPortAvailable } = require( './ports/is-port-free' );
const { getPortFree } = require( './ports/get-port-free' );

// Console
const { processWrite, processWrites } = require( './console/process-write' );

// OfnClient
const {
    // General
    issetGet,
    type,
    isArray,
    isBoolean,
    isClass,
    isDate,
    isFunction,
    isNull,
    isNully,
    isNumber,
    isObject,
    isRegexp,
    isString,
    isUndefined,

    // Numbers
    isNumeric,
    isNumberic,
    isEven,
    isOdd,
    randomMinMax,
    numberFixDecimals,
    numberPrintDecimals,

    // Strings
    capitalize,
    chunkStringByCharSize,
    escAttr,
    isStringJson,
    jsonParse,
    jsonStringify,
    jsonize,
    arrayize,
    randomString,
    slugify,
    snakeify,
    splitStringNumber,
    strPad,
    substrCount,
    textTruncate,
    trimAll,

    // Crypto
    md5,
    strEncrypt,
    strDecrypt,

    // Functions
    sleep,
    getFunctionName,

    // Classes
    getClassName,
    getClassMethods,
    getClassStaticMethods,

    // Objects
    cloneObject,
    cloneObjectWithKeys,
    cloneObjectWithoutKeys,
    getObjectMissedKeys,
    mergeObjectsDeep,
    objGetMethods,
    objHasKeys,
    objIsEmpty,
    objToStringAttr,
    objToStringAttrData,
    objToStringAttrJs,
    objToStringSqlSet,

    // Arrays
    cloneArray,
    arrayCountByKey,
    arrayGetUnique,
    arrayGroupByKey,
    arraySortByKey,
    arrayToObjectByKey,
    arrayValuesByKey,
    arraysDifference,
    arraysDifferenceAll,
    arraysIntersection,

    // Dates
    dateObjByToday,
    dateObjByTimestamp,
    dateObjBySql,
    dateObjByHtml,
    dateObjByDate,
    dateObjPlusDays,
    isDateObj,
    dateIsObj,
    datesCompare,
    dateIsBetween,
    datesDiffDays,
    datesDiffMonths,
    datesDiffMonthsArray,
    dateCheckString,

    // Urls
    urlDecode,
    urlEncode,
    urlGetBase,
    urlGetCurrentByReq,
    urlGetHostByReq,
    urlGetParams,
    urlIsValid,
    urlObjByUrl,
    urlPlainToString,
    urlStringToPlain,

    // Files
    getFilenameByPath,
    getFilenameExtByName,
    getFilenameWOutExtByName,
    getFolderByPath,
    sanitizeFilename,
    sanitizePath,
    slugifyFilename,

    // PHP Serialize
    phpSerialize,
    phpUnserialize,
    phpIsSerialized,

    // Response
    setResponseKO,
    setResponseOK,

} = require( 'oro-functions-client/src' );

module.exports = {
    // region server

    // Urls
    jwkTokenDecode,

    // Crypto
    cryptoGenerateKeyPair,

    // Files
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

    // endregion
    // region server

    // General
    issetGet,
    type,
    isArray,
    isBoolean,
    isClass,
    isDate,
    isFunction,
    isNull,
    isNully,
    isNumber,
    isObject,
    isRegexp,
    isString,
    isUndefined,

    // Numbers
    isNumeric,
    isNumberic,
    isEven,
    isOdd,
    randomMinMax,
    numberFixDecimals,
    numberPrintDecimals,

    // Strings
    capitalize,
    chunkStringByCharSize,
    escAttr,
    isStringJson,
    jsonParse,
    jsonStringify,
    jsonize,
    arrayize,
    randomString,
    slugify,
    snakeify,
    splitStringNumber,
    strPad,
    substrCount,
    textTruncate,
    trimAll,

    // Crypto
    md5,
    strEncrypt,
    strDecrypt,

    // Functions
    sleep,
    getFunctionName,

    // Classes
    getClassName,
    getClassMethods,
    getClassStaticMethods,

    // Objects
    cloneObject,
    cloneObjectWithKeys,
    cloneObjectWithoutKeys,
    getObjectMissedKeys,
    mergeObjectsDeep,
    objGetMethods,
    objHasKeys,
    objIsEmpty,
    objToStringAttr,
    objToStringAttrData,
    objToStringAttrJs,
    objToStringSqlSet,

    // Arrays
    cloneArray,
    arrayCountByKey,
    arrayGetUnique,
    arrayGroupByKey,
    arraySortByKey,
    arrayToObjectByKey,
    arrayValuesByKey,
    arraysDifference,
    arraysDifferenceAll,
    arraysIntersection,

    // Dates
    dateObjByToday,
    dateObjByTimestamp,
    dateObjBySql,
    dateObjByHtml,
    dateObjByDate,
    dateObjPlusDays,
    isDateObj,
    dateIsObj,
    datesCompare,
    dateIsBetween,
    datesDiffDays,
    datesDiffMonths,
    datesDiffMonthsArray,
    dateCheckString,

    // Urls
    urlDecode,
    urlEncode,
    urlGetBase,
    urlGetCurrentByReq,
    urlGetHostByReq,
    urlGetParams,
    urlIsValid,
    urlObjByUrl,
    urlPlainToString,
    urlStringToPlain,

    // Files
    getFilenameByPath,
    getFilenameExtByName,
    getFilenameWOutExtByName,
    getFolderByPath,
    sanitizeFilename,
    sanitizePath,
    slugifyFilename,

    // PHP Serialize
    phpSerialize,
    phpUnserialize,
    phpIsSerialized,

    // Response
    setResponseKO,
    setResponseOK,

    // endregion
}