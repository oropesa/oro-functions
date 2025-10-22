## 2.4.4 / 2025-10-21
- Add `update-deps.js` script.
- Update _github-workflows_ with `actions/checkout@v5` and `node-version: 22`.
- Update libs:
    - `fs-extra` from `v11.3.0` to `v11.3.2`.
    - `get-port-please` from `v3.1.2` to `v3.2.0`.
    - `oro-functions-client` from `v2.3.5` to `v2.3.6`.
    - `zip-lib` from `v1.0.5` to `v1.1.2`.
- Update _dev_ libs:
    - `@babel/core` from `v7.26.9` to `v7.28.4`.
    - `@babel/preset-env` from `v7.26.9` to `v7.28.3`.
    - `@babel/preset-typescript` from `v7.26.0` to `v7.27.1`.
    - `@eslint/js` from `v9.22.0` to `v9.38.0`.
    - `@types/jest` from `v29.5.14` to `v30.0.0`.
    - `babel-jest` from `v29.7.0` to `v30.2.0`.
    - `eslint` from `v9.22.0` to `v9.38.0`.
    - `eslint-config-prettier` from `v10.1.1` to `v10.1.8`.
    - `eslint-plugin-jest` from `v28.11.0` to `v29.0.1`.
    - `eslint-plugin-prettier` from `v5.2.3` to `v5.5.4`.
    - `eslint-plugin-unicorn` from `v57.0.0` to `v61.0.2`.
    - `globals` from `v16.0.0` to `v16.4.0`.
    - `jest` from `v29.7.0` to `v30.2.0`.
    - `nodemon` from `v3.1.9` to `v3.1.10`.
    - `prettier` from `v3.5.3` to `v3.6.2`.
    - `tsup` from `v8.4.0` to `v8.5.0`.
    - `typescript` from `v5.8.2` to `v5.9.3`.
    - `typescript-eslint` from `v8.26.0` to `v8.46.2`.

## 2.4.3 / 2025-03-08

- Reset `package-lock.json`.
- Enhance `tsconfig.json`.
- Enhance _package_ `clean` and `build` scripts.
- Update libs:
  - `fast-glob` from `v3.3.2` to `v3.3.3`.
  - `fs-extra` from `v11.2.0` to `v11.3.0`.
  - `oro-functions-client` from `v2.3.4` to `v2.3.5`.
- Update _dev_ libs:
  - `@babel/core` from `v7.26.0` to `v7.26.9`.
  - `@babel/preset-env` from `v7.26.0` to `v7.26.9`.
  - `@eslint/js` from `v9.17.0` to `v9.22.0`.
  - `@trivago/prettier-plugin-sort-imports` from `v5.2.0` to `v5.2.2`.
  - `eslint` from `v9.16.0` to `v9.22.0`.
  - `eslint-config-prettier` from `v9.1.0` to `v10.1.1`.
  - `eslint-plugin-jest` from `v28.9.0` to `v28.11.0`.
  - `eslint-plugin-prettier` from `v5.2.1` to `v5.2.3`.
  - `eslint-plugin-unicorn` from `v56.0.1` to `v57.0.0`.
  - `globals` from `v15.13.0` to `v16.0.0`.
  - `prettier` from `v3.4.2` to `v3.5.3`.
  - `tsup` from `v8.3.5` to `v8.4.0`.
  - `typescript` from `v5.7.2` to `v5.8.2`.
  - `typescript-eslint` from `v8.18.0` to `v8.26.0`.

## 2.4.2 / 2024-12-30

- Added _file_ methods:
  - async `pathExists`.
  - async `pathIsFile`.
- Improved _file_ method:
  - async `pathIsFolder`.

## 2.4.1 / 2024-12-30

- Added _command_ methods:
  - _async_ `execCommandShell` (the same as `execCommand('...', { inheritShell: true })`).
- Added _console_ methods:
  - `printWarn`.

## 2.4.0 / 2024-12-30

- Added _command_ methods:
  - _async_ `execCommand`.
- Added _console_ methods:
  - `printText`.
  - `printInfo`.
  - `printError`.
  - `printSuccess`.
  - `printDone`.

## 2.3.4 / 2024-12-13

- Improve `eslint.config.js`.
- Added libs:
  - `oro-functions-client` from `v2.3.3` to `v2.3.4`.
  - `zip-lib` from `v1.0.4` to `v1.0.5`.
- Added _dev_ libs:
  - `eslint-plugin-jest-dom` added `v5.5.0`.
  - `eslint-plugin-prettier` added `v5.2.1`.
- Update _dev_ libs:
  - `@babel/core` from `v7.25.8` to `v7.26.0`.
  - `@babel/preset-env` from `v7.25.8` to `v7.26.0`.
  - `@babel/preset-typescript` from `v7.25.7` to `v7.26.0`.
  - `@eslint/js` from `v9.12.0` to `v9.16.0`.
  - `@trivago/prettier-plugin-sort-imports` from `v4.3.0` to `v5.2.0`.
  - `@types/jest` from `v29.5.13` to `v29.5.14`.
  - `eslint` from `v9.12.0` to `v9.16.0`.
  - `eslint-plugin-jest` from `v28.8.3` to `v28.9.0`.
  - `eslint-plugin-unicorn` from `v56.0.0` to `v56.0.1`.
  - `globals` from `v15.11.0` to `v15.13.0`.
  - `husky` from `v9.1.6` to `v9.1.7`.
  - `nodemon` from `v3.1.7` to `v3.1.9`.
  - `prettier` from `v3.3.3` to `v3.4.2`.
  - `tsup` from `v8.3.0` to `v8.3.5`.
  - `typescript` from `v5.5.4` to `v5.7.2`.
  - `typescript-eslint` from `v8.8.1` to `v8.18.0`.

## 2.3.3 / 2024-10-13

- Updated libs:
  - `oro-functions-client` from `v2.3.2` to `v2.3.3`.
- Updated _dev_ libs:
  - `@babel/core` from `v7.25.2` to `v7.25.8`.
  - `@babel/preset-env` from `v7.25.4` to `v7.25.8`.
  - `@babel/preset-typescript` from `v7.24.7` to `v7.25.7`.
  - `@eslint/js` from `v9.11.0` to `v9.12.0`.
  - `eslint` from `v9.11.0` to `v9.12.0`.
  - `eslint-plugin-unicorn` from `v55.0.0` to `v56.0.0`.
  - `globals` from `v15.9.0` to `v15.11.0`.
  - `typescript-eslint` from `v8.7.0` to `v8.8.1`.

## 2.3.2 / 2024-09-23

- Apply `prettier --write` in the whole project (with `endOfLine: 'lf'`).
- Fix eslint `@typescript-eslint/no-unused-expressions` rule in code.
- Update `eslint` _breakpoint version_ (v8 to v9).
- Update typescript _target_ to `ES2020`.
- Updated libs:
  - `oro-functions-client` from `v2.3.1` to `v2.3.2`.
- Updated _dev_ libs:
  - `@babel/core` from `v7.24.9` to `v7.25.2`.
  - `@babel/preset-env` from `v7.24.8` to `v7.25.4`.
  - `@eslint/js` from `v9.7.0` to `v9.11.1`.
  - `@types/jest` from `v29.5.12` to `v29.5.13`.
  - `eslint` from `v8.57.0` to `v9.11.1`.
  - `eslint-plugin-jest` from `v28.6.0` to `v28.8.3`.
  - `eslint-plugin-unicorn` from `v54.0.0` to `v55.0.0`.
  - `globals` from `v15.8.0` to `v15.9.0`.
  - `husky` from `v9.0.11` to `v9.1.6`.
  - `nodemon` from `v3.1.4` to `v3.1.7`.
  - `tsup` from `v8.1.0` to `v8.3.0`.
  - `typescript` from `v5.5.3` to `v5.5.4`.
  - `typescript-eslint` from `v7.16.0` to `v8.7.0`.

## 2.3.1 / 2024-07-15

- Updated libs:
  - `oro-functions-client` from `v2.3.0` to `v2.3.1`.
- Updated _dev_ libs:
  - `@babel/core` from `v7.24.5` to `v7.24.9`.
  - `@babel/preset-env` from `v7.24.5` to `v7.24.8`.
  - `@babel/preset-typescript` from `v7.24.1` to `v7.24.7`.
  - `@eslint/js` from `v9.2.0` to `v9.7.0`.
  - `eslint-plugin-jest` from `v28.5.0` to `v28.6.0`.
  - `eslint-plugin-unicorn` from `v53.0.0` to `v54.0.0`.
  - `globals` from `v15.2.0` to `v15.8.0`.
  - `nodemon` from `v3.1.0` to `v3.1.4`.
  - `prettier` from `v3.2.5` to `v3.3.3`.
  - `tsup` from `v8.0.2` to `v8.1.0`.
  - `typescript` from `v5.4.5` to `v5.5.3`.
  - `typescript-eslint` from `v7.9.0` to `v7.16.0`.

## 2.3.0 / 2024-05-18

- Jumped version `2.2.0` to `2.3.0`, to have the same minor-version of `oro-functions-client`.
- Updated _eslint_ to flat `eslint.config.js`.
- Simplified `tsup.config.ts`.
- Re-init `package-lock.json`.
- Updated _prettier_ `printWidth: 120`
- Updated libs:
  - `oro-functions-client` from `v2.2.2` to `v2.3.0`.
- Updated _dev_ libs:
  - `@babel/core` from `v7.24.4` to `v7.24.5`.
  - `@babel/preset-env` from `v7.24.4` to `v7.24.5`.
  - `eslint-plugin-jest` from `v28.2.0` to `v28.5.0`.
  - `eslint-plugin-unicorn` from `v52.0.0` to `v53.0.0`.
- Added _dev_ libs:
  - `@eslint/js` added `v9.2.0`.
  - `globals` added `v15.2.0`.
  - `typescript-eslint` added `v7.9.0`.
- Removed _dev_ libs:
  - `@typescript-eslint/eslint-plugin` removed.
  - `@typescript-eslint/parser` removed.
  - `eslint-config-alloy` removed.
  - `eslint-plugin-github` removed.
  - `eslint-plugin-jest-formatting` removed.

## 2.1.1 / 2024-04-26

- Improved _github cicd_ replacing `actions/--@v3` by `actions/--@v4`.
- Fixed _prettier_ `endOfLine: 'lf'`
- Updated _libs_:
  - `oro-functions-client` from `v2.2.0` to `v2.2.2`.
  - `zip-lib` from `v1.0.0` to `v1.0.4`.
- Added _dev_ libs:
  - `eslint-plugin-github@^4.10.2`
- Updated _dev_ libs:
  - `@babel/core` from `v7.23.9` to `v7.24.4`.
  - `@babel/preset-env` from `v7.23.9` to `v7.24.4`.
  - `@babel/preset-typescript` from `v7.23.3` to `v7.24.1`.
  - `@typescript-eslint/eslint-plugin` from `v7.0.2` to `v7.7.1`.
  - `@typescript-eslint/parser` from `v7.0.2` to `v7.7.1`.
  - `eslint-plugin-jest` from `v27.9.0` to `v28.2.0`.
  - `eslint-plugin-unicorn` from `v51.0.1` to `v52.0.0`.
  - `typescript` from `v5.3.3` to `v5.4.5`.

## 2.1.0 / 2024-03-09

- Updated some _functions_:
  - Updated `obtainingConfig`, `obtainOConfigSync` using by default the file `oconfig.json`.
  - Added in console _process write_:
    - consts `PROCESS_WRITE_COLORS`, `PROCESS_WRITE_COLOR_NUMBER`, `PROCESS_WRITE_BACKGROUND_NUMBER`.
    - types `ProcessWriteColorNumber`, `ProcessWriteBackgroundNumber`.
- Setted a deprecated some functions:
  - `obtainOroConfig`, use `obtainOConfig` with `oconfig.json` as default file instead.
  - `obtainOroConfigSync`, use `obtainOConfigSync` with `oconfig.json` as default file instead.
  - `isPortAvailable`, use `isPortFree` instead.
- Fixed `let` by `const` when it's required.
- Added _coverage_ for testing.
- Added _watcher_ for coding.
- Improved _github cicd_ replacing `npm install` to `npm ci`.
- Improved `export` declarations in index files.
- Enhanced _linter_ adding some extensions.
- Enhanced _prettier_ adding import-sorter.
- Improved tests migrating every test to the same level as their source file.
- Enhanced testing to achieve the `~95%` of coverage (yay!).
- Updated libs:
  - `fs-extra` from `v11.1.1` to `v11.2.0`.
  - `get-port-please` from `^3.1.1` to `v3.1.2`.
  - `oro-functions-client` from `v2.1.2` to `v2.2.0`.
  - `zip-lib` from `v0.7.3` to `v1.0.0`.
- Updated _dev_ libs:
  - `@babel/core` from `v7.23.3` to `v7.23.9`.
  - `@babel/preset-env` from `v7.23.3` to `v7.23.9`.
  - `@types/jest` from `v29.5.10` to `v29.5.12`.
  - `@typescript-eslint/eslint-plugin` from `v6.12.0` to `v7.0.2`.
  - `@typescript-eslint/parser` from `v6.12.0` to `v7.0.2`.
  - `eslint` from `v8.54.0` to `v^8.57.0`.
  - `eslint-plugin-unicorn` from `v49.0.0` to `v50.0.1`.
  - `husky` from `v8.0.3` to `v9.0.11`.
  - `prettier` from `v3.1.0` to `v3.2.5`.
  - `tsup` from `v8.0.1` to `v8.0.2`.
  - `typescript` from `v5.2.2` to `v5.3.3`.
- Added _dev_ libs:
  - `@trivago/prettier-plugin-sort-imports`
  - `eslint-plugin-jest-formatting`
  - `eslint-config-prettier`
  - `eslint-plugin-jest`
  - `nodemon`

## 2.0.3 / 2023-11-23

- Updated lib: `oro-functions-client` from `v2.1.1` to `v2.1.2`.

## 2.0.2 / 2023-11-22

- Fixed _github action_ `npm_publish_on_pr_merge_to_master`.
- Updated libs:
  - `fast-glob` from `v3.3.1` to `v3.3.2`.
  - `oro-functions-client` from `v2.1.0` to `v2.1.1`.
- Updated _dev_ libs:
  - `@babel/core` from `v7.23.2` to `v7.23.3`.
  - `@babel/preset-env` from `v7.23.2` to `v7.23.3`.
  - `@babel/preset-typescript` from `v7.23.2` to `v7.23.3`.
  - `@types/atob` from `v2.1.3` to `v2.1.4`.
  - `@types/fs-extra` from `v11.0.3` to `v11.0.4`.
  - `@types/jest` from `v29.5.7` to `v29.5.10`.
  - `@typescript-eslint/eslint-plugin` from `v6.9.1` to `v6.12.0`.
  - `@typescript-eslint/parser` from `v6.9.1` to `v6.12.0`.
  - `eslint` from `v8.52.0` to `v8.54.0`.
  - `prettier` from `v3.0.3` to `v3.1.0`.
  - `tsup` from `v7.2.0` to `v8.0.1`.

## 2.0.1 / 2023-11-03

- Fixed typescript output definition of _fn_ `getFileJsonRecursively`, `getFileJsonRecursivelySync` to simplify their use (removing `{}`).
- Updated _dev_ libs:
  - `@types/jest` from `v29.5.6` to `v29.5.7`.
  - `@typescript-eslint/eslint-plugin` from `v6.9.0` to `v6.9.1`.
  - `@typescript-eslint/parser` from `v6.9.0` to `v6.9.1`.
  - `eslint-plugin-unicorn` from `v48.0.1` to `v49.0.0`.
- Deleted non-use _dev_ libs:
  - `@types/crypto-js`.
  - `@types/express`.
  - `@types/lodash.clonedeep`.

## 2.0.0 / 2023-10-27

**NOTE:**<br>
⚠️ It's not valid anymore:<br>`const Ofn = require('oro-functions')`,<br>
✔️ use the following instead:<br>`const { Ofn } = require('oro-functions')`

- Added method `osIsAndroid`.
- Updated method `isPortFree` adding a second param `host` (by default `localhost`) to check specific port.
- Updated method `getPortFree` adding a third param `host` (by default `localhost`) to get free port.
- Refactored `*.js` to `src/*.ts`.
- Improved _typescript output declarations_.
- Updated _package_ as `type: "module"`.
- Added `tsup` and now _package_ is compiled to `cjs` _(common)_ and `mjs` _(module)_.
- Added _github actions_:
  - `validate_pr_to_master`
  - `npm_publish_on_pr_merge_to_master`.
- Added `husky` (to ensure only valid commits).
- Added `eslint` (and applied it).
- Added `prettier` (and applied it).
- Updated _package description_
- Updated libs:
  - `fast-glob` to `v3.3.1`
  - `get-port-please` to `v3.1.1`
  - `oro-functions-client` to `v2.1.0`
- Updated _dev_ libs:
  - `@babel/core` to `v7.23.2`.
  - `@babel/preset-env` to `v7.23.2`.
  - `@babel/preset-typescript` to `v7.23.2`.
  - `@types/express` to `4.17.20`
  - `@types/jest` to `v29.5.6`.
  - `babel-jest` to `v29.7.0`.
  - `jest` to `v29.7.0`.

## 1.3.2 / 2023-06-19

- Improved _readme_ (`SResponseOK`, `SResponseKO`).

## 1.3.1 / 2023-06-17

- Fixed bad declared `import` from `process-write`.

## 1.3.0 / 2023-06-17

- Added `TS` support.
- Added _ts tests_.
- Improved _tests_.
- Improved _readme_.
- Updated lib `fast-glob` to `v3.2.12`.
- Updated lib `fs-extra` to `v11.1.1`.
- Updated lib `get-port-please` to `v3.0.1`.
- Updated lib `oro-functions-client` to `v1.5.4`.
- Updated lib-dev `jest` to `v29.5.0`.
- Renamed fns `obtainOConfig`, `obtainOConfigSync`, `isPortFree`
  and deprecated `obtainOroConfig`, `obtainOroConfigSync`, `isPortAvailable`.
- Allow to get functions individually in `/src`:
  - `const { fn1, fn2, ... } = require( 'oro-functions/src' )` (including 'oro-functions-client')

## 1.2.1 / 2022-08-16

- Updated lib `oro-functions-client` to `v1.4.1`.

## 1.2.0 / 2022-08-04

- Updated _Readme_ and `tests/`.
- Added `package-lock.json`.
- Changed lib `find-free-port` to `get-port-please`.
- Updated lib `oro-functions-client` to `v1.4.0`.
- Updated lib-dev `jest` to `v28.1.3`.

## 1.1.7 / 2022-06-21

- Updated lib `oro-functions-client` to `v1.3.7`.

## 1.1.6 / 2022-06-21

- Updated lib `oro-functions-client` to `v1.3.6`.
- Updated lib-dev `jest` to `v28.1.01`.

## 1.1.5 / 2022-05-25

- Updated lib `fast-glob` to `v3.2.11`.
- Updated lib `fs-extra` to `v10.1.0`.
- Updated lib `oro-functions-client` to `v1.3.5`.
- Updated lib `zip-lib` to `v0.7.3`.
- Updated lib-dev `jest` to `v28.1.0`.

## 1.1.4 / 2022-03-10

- Updated lib `oro-functions-client` to `v1.3.4`.

## 1.1.3 & 1.1.2 / 2022-03-10

- Updated lib `oro-functions-client` to `v1.3.2`.

## 1.1.1 / 2021-12-28

- Updated lib `oro-functions-client` to `v1.3.1`.

## 1.1.0 / 2021-12-17

- Added _method_ `cryptoGenerateKeyPair` from `oro-functions-client` because it breaks in _front frameworks_ like `Vue`.

## 1.0.4 / 2021-12-14

- Updated lib `oro-functions-client` to `v1.2.1`.

## 1.0.3 / 2021-12-14

- Updated lib `oro-functions-client` to `v1.2.0`.
- Updated lib `jest` to `v27.4.5`.

## 1.0.2 / 2021-12-07

- Updated lib `oro-functions-client` to `v1.1.0`.

## 1.0.1 / 2021-09-21

- Updated lib `oro-functions-client` to `v1.0.1`.

## 1.0.0 / 2021-08-23

- Added _unit testing_ `Jest`.
- Added `MIT License`.
- Added _package_ in `github.com` & `npmjs.com`.
- Added _methods_:
  - `pathIsFolder`
  - `processWrites`
- Updated _methods_:
  - `globFiles` and `folderIsEmpty` has second param default `globArgs = {
dot: true,
unique: true,
onlyFiles: true,
ignore: [ "node_modules/**", ".zero/**" ]
}`.
  - `zipFolder` change library from `zip-a-folder` to `zip-lib` and now is allowed to zip _folder_ or _file_.

## 0.13.1 / 2021-07-28

- Update `oro-functions-client` to `v0.23.2`.

## 0.13.0 / 2021-07-20

- Added method `getPortFree`.

## 0.12.0 / 2021-07-20

- Added method `isPortAvailable`.

## 0.11.10 & 0.11.9 / 2021-07-07

- Update `oro-functions-client` to `v0.23.1`.

## 0.11.8 / 2021-06-29

- Update `oro-functions-client` to `v0.22.0`.

## 0.11.7 & 0.11.6 / 2021-06-28

- Update `oro-functions-client` to `v0.21.0`.
- Update `oro-functions-client` to `v0.20.1`.

## 0.11.5 / 2021-06-25

- Update `oro-functions-client` to `v0.20.0`.

## 0.11.3-0.11.4 / 2021-06-18

- Update `oro-functions-client` to `v0.19.1`.

## 0.11.2 / 2021-05-18

- Updated method `globFiles`, params `onlyFiles` and `ignore` now are arguments.
- Fixed method `folderIsEmpty`, using `globFiles` with `onlyFiles = false`.

## 0.11.1 / 2021-05-18

- Update `oro-functions-client` to `v0.18.3`.

## 0.11.0 / 2021-05-19

- Added method `zipFolder`.
- Added in `.gitignore` the file `test.js`.

## 0.10.0 / 2021-05-19

- Added method `folderIsEmpty`.

## 0.9.10 / 2021-05-18

- Update `oro-functions-client` to `v0.18.2`.

## 0.9.8 / 2021-05-18

- Update `oro-functions-client` to `v0.18.0`.

## 0.9.7 / 2021-05-17

- Update `oro-functions-client` to `v0.17.0`.

## 0.9.6 / 2021-05-17

- Update `oro-functions-client` to `v0.16.0`.

## 0.9.5 / 2021-05-17

- Update `oro-functions-client` to `v0.15.0`.

## 0.9.4 / 2021-05-14

- Update `oro-functions-client` to `v0.14.0`.

## 0.9.3 / 2021-05-14

- Update `oro-functions-client` to `v0.13.0`.

## 0.9.2 / 2021-05-13

- Update `oro-functions-client` to `v0.12.0`.

## 0.9.1 / 2021-05-06

- Update `oro-functions-client` to `v0.11.0`.

## 0.9.0 / 2021-05-04

- Added method `processWrite`.

## 0.8.1 / 2021-05-04

- Changed `param:oConfig` by `param:config` in methods `obtainOroConfig` and `obtainOroConfigSync`.

## 0.8.0 / 2021-05-04

- Added methods `obtainOroConfig` and `obtainOroConfigSync`.
- Updated methods `getFileJsonRecursively` and `getFileJsonRecursivelySync`, using `Ofn.mergeObjectsDeep` instead of `Object.asign`.

## 0.7.9 / 2021-04-30

- Update `oro-functions-client` to `v0.10.1`.

## 0.7.7 / 2021-04-30

- Update `oro-functions-client` to `v0.9.2`.

## 0.7.5 / 2021-04-23

- Update `oro-functions-client` to `v0.9.0`.

## 0.7.4 / 2021-04-22

- Update `oro-functions-client` to `v0.8.1`.

## 0.7.3 / 2021-04-22

- Update `oro-functions-client` to `v0.8.0`.

## 0.7.2 / 2021-04-22

- Update `oro-functions-client` to `v0.7.2`.

## 0.7.1 / 2021-04-21

- Separate `oro-functions-client` from `oro-functions` to allow using the lib on _client-side_.

Note: `oro-functions` still doing the same, it has only the _server-side_ functions and extends the others from`oro-functions-client`.

## 0.6.1 / 2021-04-21

- Update library `oro-regexp` to `v0.1.0`.

## 0.6.0 / 2021-04-17

- Add method `sleep`.

## 0.5.2 / 2021-04-15

- Fix method `sanitizePath` when `filepath` is not `string`.

## 0.5.1 / 2021-04-14

- Fix method `chunkStringByCharSize` when `str` is `number`.

## 0.5.0 / 2021-04-12

- Add method `arraysIntersection`.

## 0.4.0 / 2021-04-12

- Add method `getFunctionName`.

## 0.3.1 / 2021-04-12

- Fix no param _error_ in `setResponseOK`.

## 0.3.0 / 2021-04-08

- Add method `jsonize`.

## 0.2.4 / 2021-04-06

- Replicate method as _sync mode_ `getFileJsonRecursivelySync`.

## 0.2.3 / 2021-03-30

- Fixed folder of method `getFileJsonRecursively`.

## 0.2.2 / 2021-03-29

- Added npm-atob to ensure method `jwkTokenDecode` on Windows.

## 0.2.1 / 2021-03-25

- Added methods `chunkStringByCharSize`.

## 0.1.1 / 2021-03-24

- Fix tag _async_ of `getFileJsonRecursively`.

## 0.1.0 / 2021-03-24

- Added changelog.
- Added npm fs-extra.
- Added methods _async_ `getFileJsonRecursively`.
