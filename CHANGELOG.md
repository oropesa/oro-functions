## 1.1.7 / 2022-06-21
* Updated lib `oro-functions-client` to `v1.3.7`.

## 1.1.6 / 2022-06-21
* Updated lib `oro-functions-client` to `v1.3.6`.
* Updated lib-dev `jest` to `v28.1.01`.

## 1.1.5 / 2022-05-25
* Updated lib `fast-glob` to `v3.2.11`.
* Updated lib `fs-extra` to `v10.1.0`.
* Updated lib `oro-functions-client` to `v1.3.5`.
* Updated lib `zip-lib` to `v0.7.3`.
* Updated lib-dev `jest` to `v28.1.0`.

## 1.1.4 / 2022-03-10
* Updated lib `oro-functions-client` to `v1.3.4`.

## 1.1.3 & 1.1.2 / 2022-03-10
* Updated lib `oro-functions-client` to `v1.3.2`.

## 1.1.1 / 2021-12-28
* Updated lib `oro-functions-client` to `v1.3.1`.

## 1.1.0 / 2021-12-17
* Added _method_ `cryptoGenerateKeyPair` from `oro-functions-client` because it breaks in _front frameworks_ like `Vue`.

## 1.0.4 / 2021-12-14
* Updated lib `oro-functions-client` to `v1.2.1`.

## 1.0.3 / 2021-12-14
* Updated lib `oro-functions-client` to `v1.2.0`.
* Updated lib `jest` to `v27.4.5`.

## 1.0.2 / 2021-12-07
* Updated lib `oro-functions-client` to `v1.1.0`.

## 1.0.1 / 2021-09-21
* Updated lib `oro-functions-client` to `v1.0.1`.

## 1.0.0 / 2021-08-23
* Added _unit testing_ `Jest`.
* Added `MIT License`.
* Added _package_ in `github.com` & `npmjs.com`.
* Added _methods_:
    * `pathIsFolder`
    * `processWrites`
* Updated _methods_:
    * `globFiles` and `folderIsEmpty` has second param default `globArgs = {
      dot: true,
      unique: true,
      onlyFiles: true,
      ignore: [ "node_modules/**", ".zero/**" ]
      }`.
    * `zipFolder` change library from `zip-a-folder` to `zip-lib` and now is allowed to zip _folder_ or _file_.

## 0.13.1 / 2021-07-28
* Update `oro-functions-client` to `v0.23.2`.

## 0.13.0 / 2021-07-20
* Added method `getPortFree`.

## 0.12.0 / 2021-07-20
* Added method `isPortAvailable`.

## 0.11.10 & 0.11.9 / 2021-07-07
* Update `oro-functions-client` to `v0.23.1`.

## 0.11.8 / 2021-06-29
* Update `oro-functions-client` to `v0.22.0`.

## 0.11.7 & 0.11.6 / 2021-06-28
* Update `oro-functions-client` to `v0.21.0`.
* Update `oro-functions-client` to `v0.20.1`.

## 0.11.5 / 2021-06-25
* Update `oro-functions-client` to `v0.20.0`.

## 0.11.3-0.11.4 / 2021-06-18
* Update `oro-functions-client` to `v0.19.1`.

## 0.11.2 / 2021-05-18
* Updated method `globFiles`, params `onlyFiles` and `ignore` now are arguments.
* Fixed method `folderIsEmpty`, using `globFiles` with `onlyFiles = false`.

## 0.11.1 / 2021-05-18
* Update `oro-functions-client` to `v0.18.3`.

## 0.11.0 / 2021-05-19
* Added method `zipFolder`.
* Added in `.gitignore` the file `test.js`.

## 0.10.0 / 2021-05-19
* Added method `folderIsEmpty`.

## 0.9.10 / 2021-05-18
* Update `oro-functions-client` to `v0.18.2`.

## 0.9.8 / 2021-05-18
* Update `oro-functions-client` to `v0.18.0`.

## 0.9.7 / 2021-05-17
* Update `oro-functions-client` to `v0.17.0`.

## 0.9.6 / 2021-05-17
* Update `oro-functions-client` to `v0.16.0`.

## 0.9.5 / 2021-05-17
* Update `oro-functions-client` to `v0.15.0`.

## 0.9.4 / 2021-05-14
* Update `oro-functions-client` to `v0.14.0`.

## 0.9.3 / 2021-05-14
* Update `oro-functions-client` to `v0.13.0`.

## 0.9.2 / 2021-05-13
* Update `oro-functions-client` to `v0.12.0`.

## 0.9.1 / 2021-05-06
* Update `oro-functions-client` to `v0.11.0`.

## 0.9.0 / 2021-05-04
* Added method `processWrite`.

## 0.8.1 / 2021-05-04
* Changed `param:oConfig` by `param:config` in methods `obtainOroConfig` and `obtainOroConfigSync`.

## 0.8.0 / 2021-05-04
* Added methods `obtainOroConfig` and `obtainOroConfigSync`.
* Updated methods `getFileJsonRecursively` and `getFileJsonRecursivelySync`, using `Ofn.mergeObjectsDeep` instead of `Object.asign`.

## 0.7.9 / 2021-04-30
* Update `oro-functions-client` to `v0.10.1`.

## 0.7.7 / 2021-04-30
* Update `oro-functions-client` to `v0.9.2`.

## 0.7.5 / 2021-04-23
* Update `oro-functions-client` to `v0.9.0`.

## 0.7.4 / 2021-04-22
* Update `oro-functions-client` to `v0.8.1`.

## 0.7.3 / 2021-04-22
* Update `oro-functions-client` to `v0.8.0`.

## 0.7.2 / 2021-04-22
* Update `oro-functions-client` to `v0.7.2`.

## 0.7.1 / 2021-04-21
* Separate `oro-functions-client` from `oro-functions` to allow using the lib on _client-side_.

Note: `oro-functions` still doing the same, it has only the _server-side_ functions and extends the others from`oro-functions-client`. 

## 0.6.1 / 2021-04-21
* Update library `oro-regexp` to `v0.1.0`.

## 0.6.0 / 2021-04-17
* Add method `sleep`.

## 0.5.2 / 2021-04-15
* Fix method `sanitizePath` when `filepath` is not `string`.

## 0.5.1 / 2021-04-14
* Fix method `chunkStringByCharSize` when `str` is `number`.

## 0.5.0 / 2021-04-12
* Add method `arraysIntersection`.

## 0.4.0 / 2021-04-12
* Add method `getFunctionName`.

## 0.3.1 / 2021-04-12
* Fix no param *error* in `setResponseOK`.

## 0.3.0 / 2021-04-08
* Add method `jsonize`.

## 0.2.4 / 2021-04-06
* Replicate method as *sync mode* `getFileJsonRecursivelySync`.

## 0.2.3 / 2021-03-30
* Fixed folder of method `getFileJsonRecursively`.

## 0.2.2 / 2021-03-29
* Added npm-atob to ensure method `jwkTokenDecode` on Windows.

## 0.2.1 / 2021-03-25
* Added methods `chunkStringByCharSize`.

## 0.1.1 / 2021-03-24
* Fix tag *async* of `getFileJsonRecursively`.

## 0.1.0 / 2021-03-24
* Added changelog.
* Added npm fs-extra. 
* Added methods *async* `getFileJsonRecursively`.
