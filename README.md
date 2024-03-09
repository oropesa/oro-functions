# Oro Functions

- [Overview](#overview)
- [Installation](#installation)
- [Example](#example)
- [Methods](#methods)

## Overview

**Ofn** contains utility static methods (helpers).

This package ( `oro-functions` ) is divided from `oro-functions-client` to allow using that functions in _js-client frameworks_ like `Vuejs` or `React`.

Class `oro-functions` is extended from `oro-functions-client`.

If you want to know all fns, read **[oro-functions-client](https://github.com/oropesa/oro-functions-client/)**.

Functions could be divided in groups: <br>
⇢ (Extended) <br>
· [URLs](#urls) <br>
· [Crypto](#crypto) <br>
· [Files](#files) <br>
· [Operating System](#operating-system) <br>
· [Ports](#ports) <br>
· [Console](#console) <br>
⇢ (Client) <br>
· [General](https://github.com/oropesa/oro-functions-client#general) <br>
· [Numbers](https://github.com/oropesa/oro-functions-client#numbers) <br>
· [String](https://github.com/oropesa/oro-functions-client#string) <br>
· [Crypto](https://github.com/oropesa/oro-functions-client#crypto) <br>
· [Functions](https://github.com/oropesa/oro-functions-client#functions) <br>
· [Classes](https://github.com/oropesa/oro-functions-client#objects) <br>
· [Objects](https://github.com/oropesa/oro-functions-client#objects) <br>
· [Arrays](https://github.com/oropesa/oro-functions-client#arrays) <br>
· [Dates](https://github.com/oropesa/oro-functions-client#dates) <br>
· [URLs](https://github.com/oropesa/oro-functions-client#urls) <br>
· [Files](https://github.com/oropesa/oro-functions-client#files) <br>
· [PHP Serialize](https://github.com/oropesa/oro-functions-client#php-serialize) <br>
· [Response](https://github.com/oropesa/oro-functions-client#response) <br>

## Installation

```shell
npm install oro-functions
```

## Example:

```js
// cjs
const { Ofn } = require( 'oro-functions' );

// mjs, ts
import { Ofn } from 'oro-functions';

Ofn.type( [ 1, 2, 3 ] ); // -> 'array'
```

also every method could be called individually:

```js
// cjs
const { type } = require( 'oro-functions' );

// mjs, ts
import { type } from 'oro-functions';

type( [ 1, 2, 3 ] ); // -> 'array'
```

## Methods

<hr>

- [Oro Functions Client](#oro-functions-client)
- [Extended Functions](#extended-functions)

  - [URLs](#urls)

    - [Ofn.jwkTokenDecode()](#ofnjwktokendecode)

  - [Crypto](#crypto)

    - [Ofn.cryptoGenerateKeyPair()](#ofncryptogeneratekeypair)

  - [Files](#files)

    - [await Ofn.obtainOConfig()](#await-ofnobtainoconfig)
    - [Ofn.obtainOConfigSync()](#ofnobtainoconfigsync)
    - [await Ofn.getFileJsonRecursively()](#await-ofngetfilejsonrecursively)
    - [Ofn.getFileJsonRecursivelySync()](#ofngetfilejsonrecursivelysync)
    - [await Ofn.globFiles()](#await-ofnglobfiles)
    - [await Ofn.folderIsEmpty()](#await-ofnfolderisempty)
    - [await Ofn.pathIsFolder()](#await-ofnpathisfolder)
    - [await Ofn.zipFolder()](#await-ofnzipfolder)

  - [Operating System](#operating-system)

    - [Ofn.osPlatform()](#ofnosplatform)
    - [Ofn.osIsWindows()](#ofnosiswindows)
    - [Ofn.osIsMac()](#ofnosismac)
    - [Ofn.osIsLinux()](#ofnosislinux)
    - [Ofn.osIsAndroid()](#ofnosisandroid)

  - [Ports](#ports)

    - [await Ofn.isPortFree()](#await-ofnisportfree)
    - [await Ofn.getPortFree()](#await-ofngetportfree)

  - [Console](#console)
    - [Ofn.processWrite()](#ofnprocesswrite)
    - [Ofn.processWrites()](#ofnprocesswrites)

<hr>

### Oro Functions Client

In **Ofn** there are all _functions_ of [Oro Functions Client](https://github.com/oropesa/oro-functions-client).

<hr>

### Extended Functions

<hr>

### URLs

<hr>

#### Ofn.jwkTokenDecode()

```ts
jwkTokenDecode( token: string ) => string;
```

```js
Ofn.jwkTokenDecode(
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoib3JvcGVzYSIsImlhdCI6MTYyOTcxMzM2MywiZXhwIjoxNjI5NzIwNTYzfQ.2zL8FzvFQCtuqi0fFoby4QVCXSi2pWNS3bzCU53Vd4M',
);
// -> '{"user":"oropesa","iat":1629713363,"exp":1629720563}'
```

<hr>

### Crypto

<hr>

#### Ofn.cryptoGenerateKeyPair()

```ts
Ofn.cryptoGenerateKeyPair(
  passphrase?: string,
  options?: CryptoKeyPairOptions
) => Promise<CryptoKeyPairResponse>

interface CryptoKeyPairOptions {
  type?: string;
  modulusLength?: number;
  publicKeyEncodingType?: string;
  publicKeyEncodingFormat?: string;
  privateKeyEncodingType?: string;
  privateKeyEncodingFormat?: string;
  privateKeyEncodingCipher?: string;
}

type CryptoKeyPairResponse = SResponse<
  CryptoKeyPairObject,  // as SResponseOK
  CryptoKeyPairError    // as SResponseKO
>;

interface SResponseOK {
  status: true,
  passphrase: string;
  publicKey: string;
  privateKey: string;
}

interface SResponseKO {
  status: false,
  error: {
    msg: string;
    err: Error;
  }
}

interface CryptoKeyPairObject {
  passphrase: string;
  publicKey: string;
  privateKey: string;
}

interface CryptoKeyPairError {
  msg: string;
  err: Error;
}

```

```js
await Ofn.cryptoGenerateKeyPair('example');
// {
//   passphrase: 'example',
//   publicKey: '-----BEGIN RSA PUBLIC KEY-----',
//   privateKey: '-----BEGIN RSA PRIVATE KEY-----'
// }
```

- **Default options**

```js
options = {
  type: 'rsa', // 'rsa', 'rsa-pss', 'dsa', 'ec', 'ed25519', 'ed448', 'x25519', 'x448', 'dh'.
  modulusLength: 4096,
  publicKeyEncodingType: 'spki', // 'pkcs1' (RSA only) or 'spki'.
  publicKeyEncodingFormat: 'pem', // 'pem', 'der', or 'jwk'.
  privateKeyEncodingType: 'pkcs8', // 'pkcs1' (RSA only), 'pkcs8' or 'sec1' (EC only).
  privateKeyEncodingFormat: 'pem', // 'pem', 'der', or 'jwk'.
  privateKeyEncodingCipher: 'aes-256-cbc', // 'aes-256-cbc', 'des-cbc-sha', 'rc4-128-md5', ...
};
```

<hr>

### Files

<hr>

#### await Ofn.obtainOConfig()

#### Ofn.obtainOConfigSync()

```ts
await Ofn.obtainOConfig<T extends object = OConfigDefaultParams>
    ( args?: OConfigArgs ) => Promise<OConfigResponse<T>>;

Ofn.obtainOConfigSync<T extends object = OConfigDefaultParams>
    ( args?: OConfigArgs ) => OConfigResponse<T>;

interface OConfigArgs {
  file?: string;
  deep?: number;
  defaultParams?: string[];
  extraParams?: string[];
}

interface OConfigDefaultParams {
  environment: string;
  projectname: string;
  projectserver: string;
}

type OConfigResponse<T extends object = OConfigDefaultParams> =
    SResponse<
      OConfigObject<T>, // as SResponseOK
      OConfigError      // as SResponseKO
    >;

interface SResponseOK {
  status: true,
  config: T;
}

interface SResponseKO {
  status: false,
  error: {
    msg: string;
    args?: OConfigArgs;
  }
}

interface OConfigObject<T extends object = OConfigDefaultParams> {
  config: T;
}

interface OConfigError {
  msg: string;
  args?: OConfigArgs;
}

```

Put yourself in this situation, you work with _Git_ and you create _modules_ or _projects_
that need the common file `.env` to use _custom variables_, with data about, i.e.,
connect to _dbs_, _users-passwords_, _dev-pro_ or other _envs_, _custom configs_.

Then, you have something like:

```shell
- parent-folder/
  ├─ project-1/  #git-project-1
  │   └...
  ├─ project-2/  #git-project-2
  │   └...
  └...
```

Instead of create _global variables_ in the system, or duplicate the file `.env`, you can centralize
all data in `oro-config.json`.

This file, `oro-config.json`, could be in the same project and in the parent folders too,
in such a way that the _final json_ is merged and overwritten from the parent folders to the project.

So, using this example, you have:

```shell
- parent-folder/
  ├─ project-1/
  │   ├─ oro-config.json #json of project 1
  │   └...
  ├─ project-2/
  │   ├─ oro-config.json #json of project 2
  │   └...
  ├─ oro-config.json #json of parent-folder
  └...
```

Continuing, the `oro-config.json` files have the next data:

```js
// oro-config.json of Parent Folder
{
  "environment": "dev",
  "projectserver": "laptop-dev",
  "nuxt": {
    "server": "localhost",
    "defaultRole": "default"
  }
}

// oro-config.json of Project 1
{
  "projectname": "project-1"
}

// oro-config.json of Project 2
{
  "projectname": "project-2",
  "nuxt": {
    "pageName": "The Project 2",
    "defaultRole": "client"
  }
}
```

Finally, the `json` result is:

```js
/* Inside project 1 */

let obtainConfig = await Ofn.obtainOConfig( { deep: 1 } );
// {
//   status: true,
//   config: {
//     environment: 'dev',
//     projectserver: 'laptop-dev',
//     projectname: 'project-1',
//     nuxt: {
//       server: 'localhost',
//       defaultRole: 'default'
//     }
//   }
// }

/* Inside project 2 */

let obtainConfig = await Ofn.obtainOConfig( { deep: 1 } );
// {
//   status: true,
//   config: {
//     environment: 'dev',
//     projectserver: 'laptop-dev',
//     projectname: 'project-2',
//     nuxt: {
//       server: 'localhost',
//       pageName: 'The Project 2',
//       defaultRole: 'client'
//     }
//   }
// }
```

- **Default args**

```js
let args = {
  file: 'oro-config.json',
  deep: 0,
  defaultParams: ['environment', 'projectname', 'projectserver'],
  extraParams: [],
};
```

By default, there are 3 _params_ that are required in _json_: `environment`, `projectname`, `projectserver`.

So, if there are missing, the _response_ of `Ofn.obtainOConfig()` is `{ status: false, ... }`.

Alternatively, you can change `defaultParams`, or you can add `extraParams` to be required.

On the other hand, you can change de `file` name to search, so instead of `oro-config.json`, you can use `custom.json`.

Finally, you choose the `deep` from parents to look for.

<hr>

#### await Ofn.getFileJsonRecursively()

#### Ofn.getFileJsonRecursivelySync()

```ts
await Ofn.getFileJsonRecursively<T>
    ( filenameOrPath: string, parentDeep?: number ) => Promise<T>;

Ofn.getFileJsonRecursivelySync<T>
    ( filenameOrPath: string, parentDeep?: number ) => T;
```

Having this case:

```shell
- main/
  ├─ folder/
  │   ├─ subfolder/
  │   │   ├─ index.js
  │   │   └─ custom.json
  │   └ custom.json
  └ custom.json
```

The _final json_ is merged and overwritten from the parents to the project file.

```js
// in index.js
let custom = await Ofn.getFileJsonRecursively('custom.json', 2);
// { ... }
```

<hr>

#### await Ofn.globFiles()

```ts
await Ofn.globFiles = (
  folderPath: string | string[],
  globArgs?: GlobFilesOptions,
) => Promise<string[]>;
```

```js
await Ofn.globFiles(`folder/*`);
// [
//   `folder/example.txt`,
//   ...
// ]
```

- **Default args**
- This function is a wrapper of [fast-glob](https://www.npmjs.com/package/fast-glob) with _default args_.
  so `GlobFilesOptions` are the same as [fast-glob Options](https://www.npmjs.com/package/fast-glob#options-3)

```js
// default
globArgs = {
  dot: true,
  unique: true,
  onlyFiles: true,
  ignore: ['node_modules/**', '.zero/**'],
};
```

<hr>

#### await Ofn.folderIsEmpty()

```ts
await Ofn.folderIsEmpty = (
  folderPath: string,
  globArgs?: GlobFilesOptions,
) => Promise<boolean>;
```

```js
await Ofn.folderIsEmpty(`folder/`); // false
```

- **Default args**

This function is a wrapper of [fast-glob](https://www.npmjs.com/package/fast-glob) with _default args_.
so `GlobFilesOptions` are the same as [fast-glob Options](https://www.npmjs.com/package/fast-glob#options-3)

```js
// default
globArgs = {
  dot: true,
  unique: true,
  onlyFiles: true,
  ignore: ['node_modules/**', '.zero/**'],
};
```

<hr>

#### await Ofn.pathIsFolder()

```ts
await Ofn.pathIsFolder = ( folderPath: string ) => Promise<boolean>;
```

```js
await Ofn.pathIsFolder(`folder`);
// -> true
```

<hr>

#### await Ofn.zipFolder()

```ts
await Ofn.zipFolder = ( folderPath: string, zipPath?: string ) => Promise<ZipFolderResponse>;

type ZipFolderResponse = SResponse<
  ZipFolderObject, // as SResponseOK
  ZipFolderError   // as SResponseKO
>;

interface SResponseOK {
  status: true,
  zipPath: string;
}

interface SResponseKO {
  status: false,
  error: {
    msg: string;
    folderPath?: string;
    zipPath?: string;
  }
}

interface ZipFolderObject {
  zipPath: string;
}

interface ZipFolderError {
  msg: string;
  folderPath?: string;
  zipPath?: string;
}
```

```js
await Ofn.zipFolder(`folder`, 'folder.zip');
// -> { status: true, zipPath: 'folder.zip' }
```

<hr>

### Operating System

<hr>

#### Ofn.osPlatform()

```ts
Ofn.osPlatform = () => NodeJS.Platform;
```

```js
Ofn.osPlatform();
// -> 'win32' || 'darwin' || 'linux' || ...
```

<hr>

#### Ofn.osIsWindows()

```ts
Ofn.osIsWindows = () => boolean;
```

```js
Ofn.osIsWindows();
// -> true
```

<hr>

#### Ofn.osIsMac()

```ts
Ofn.osIsMac = () => boolean;
```

```js
Ofn.osIsMac();
// -> false
```

<hr>

#### Ofn.osIsLinux()

```ts
Ofn.osIsLinux = () => boolean;
```

```js
Ofn.osIsLinux();
// -> true
```

<hr>

#### Ofn.osIsAndroid()

```ts
Ofn.osIsAndroid = () => boolean;
```

```js
Ofn.osIsAndroid();
// -> true
```

<hr>

### Ports

<hr>

#### await Ofn.isPortFree()

```ts
await Ofn.isPortFree = ( port: number ) => Promise<IsPortFreeResponse>;

type IsPortFreeResponse = SResponse<
  PortFreeObject, // as SResponseOK
  IsPortFreeError // as SResponseKO
>;

interface SResponseOK {
  status: true,
  port: number;
}

interface SResponseKO {
  status: false,
  error: {
    msg: string;
    port: number;
  }
}

interface PortFreeObject {
  port: number;
}

interface IsPortFreeError {
  msg: string;
  port: number;
}
```

```js
await Ofn.isPortFree(3000);
// -> { status: true, port: 3000 }
```

<hr>

#### await Ofn.getPortFree()

```ts
await Ofn.getPortFree = ( portStart?: number | number[], portEnd?: number )
    => Promise<GetPortFreeResponse>;

type GetPortFreeResponse = SResponse<
  PortFreeObject,  // as SResponseOK
  GetPortFreeError // as SResponseKO
>;

interface SResponseOK {
  status: true,
  port: number;
}

interface SResponseKO {
  status: false,
  error: {
    msg: string;
    port?: number;
    opts?: {
      random?: boolean;
      port?: number;
      ports?: number[];
      portRange?: number[];
    };
    err?: any;
  }
}

interface PortFreeObject {
  port: number;
}

interface GetPortFreeError {
  msg: string;
  port?: number;
  opts?: {
    random?: boolean;
    port?: number;
    ports?: number[];
    portRange?: number[];
  };
  err?: any;
}
```

```js
await Ofn.getPortFree();
// -> { status: true, port: 60247 } #random

await Ofn.getPortFree(3000);
// -> { status: true, port: 3000 } #if not allowed, return random

await Ofn.getPortFree([3000, 3001, 3002]);
// -> { status: true, port: 3000 }
// -> { status: false, error: { msg: 'No available ports in array [ 3000, 3001, 3002 ]' } }

await Ofn.getPortFree(3000, 3100);
// -> { status: true, port: 3000 }
// -> { status: false, error: { msg: 'No available ports in range 3000-3100' } }
```

<hr>

### Console

<hr>

#### Ofn.processWrite()

```js
Ofn.processWrite(
  strOrObject: string | ProcessWriteObject,
  color?: string,
  bg?: string
) => string;

type ProcessWriteObject =
    | { s?: string, c?: string, b?: string }
    | { str?: string, cl?: string, bg?: string }
    | { string?: string, color?: string, background?: string }
```

```js
Ofn.processWrite('info', 'blue');
Ofn.processWrite(' Doing some stuff... ');

Ofn.processWrite({ s: 'Error!', c: 'red', b: 'redlight' });
Ofn.processWrite('\n');
```

- **Example:**

![Example Console - Process Write](https://oropensando.com/extrafiles/oro-functions/console-process-write.png)

Note: first param could be a `string` or an `object`

- **Allowed Object:**

  - `s`, `str`, or `string`
  - `c`, `cl`, or `color`
  - `b`, `bg`, or `background`

- **Allowed Colors and Background:**
  - `gray`
  - `red`
  - `green`
  - `white`
  - `yellow`
  - `blue`
  - `redlight`
  - `bluelight`

<hr>

#### Ofn.processWrites()

```js
Ofn.processWrites( arr: Array<string | ProcessWriteObject> ) => string;

type ProcessWriteObject =
    | { s?: string, c?: string, b?: string }
    | { str?: string, cl?: string, bg?: string }
    | { string?: string, color?: string, background?: string }
```

```js
Ofn.processWrites([
  { s: ' info ', c: 'blue', b: 'bluelight' },
  ' Doing some stuff... ',
  { s: 'Error!', c: 'red', b: 'redlight' },
  '\n',
]);
```

- **Example:**

![Example Console - Process Writes](https://oropensando.com/extrafiles/oro-functions/console-process-writes.png)
