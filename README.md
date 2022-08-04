# Oro Functions

* [Overview](#overview)
* [Installation](#installation)
* [Example](#example)
* [Methods](#methods)
  * [Oro Functions Client](#oro-functions-client)
  * [Extended Functions](#extended-functions)
    
    * [URLs](#urls)
      * [Ofn.jwkTokenDecode( token )](#ofnjwktokendecode-token-)
       
    * [Crypto](#crypto)
      * [Ofn.cryptoGenerateKeyPair( passphrase = '', options = {} )](#ofncryptogeneratekeypair-passphrase---options---)
    
    * [Files](#files)
      * [await Ofn.obtainOroConfig( args )](#await-ofnobtainoroconfig-args-)
      * [Ofn.obtainOroConfigSync( args )](#ofnobtainoroconfigsync-args-)
      * [await Ofn.getFileJsonRecursively( filenameOrPath, parentDeep = 0 )](#await-ofngetfilejsonrecursively-filenameorpath-parentdeep--0-)
      * [Ofn.getFileJsonRecursivelySync( filenameOrPath, parentDeep = 0 )](#ofngetfilejsonrecursivelysync-filenameorpath-parentdeep--0-)
      * [await Ofn.globFiles( folderPath, globArgs = {} )](#await-ofnglobfiles-folderpath-globargs---)
      * [await Ofn.folderIsEmpty( folderPath, globArgs = {} )](#await-ofnfolderisempty-folderpath-globargs---)
      * [await Ofn.pathIsFolder( path )](#await-ofnpathisfolder-path-)
      * [await Ofn.zipFolder( folderPath, zipPath, compressionLevel = undefined )](#await-ofnzipfolder-folderpath-zippath-compressionlevel--undefined-)
    
    * [Operating System](#operating-system)
      * [Ofn.osPlatform()](#ofnosplatform)
      * [Ofn.osIsWindows()](#ofnosiswindows)
      * [Ofn.osIsMac()](#ofnosismac)
      * [Ofn.osIsLinux()](#ofnosislinux)
    
    * [Ports](#ports)
      * [await Ofn.isPortAvailable( port )](#await-ofnisportavailable-port-)
      * [await Ofn.getPortFree( portStart = null, portEnd = null )](#await-ofngetportfree-portstart--null-portend--null-)
    
    * [Console](#console)
      * [Ofn.processWrite( strOrObject, color = '', bg = '' )](#ofnprocesswrite-strorobject-color---bg---)
      * [Ofn.processWrites( arr )](#ofnprocesswrites-arr-)

## Overview

By default, **Ofn**, it's a simple class with helper static functions.

This package ( `oro-functions` ) is divided from `oro-functions-client` to allow using that functions in _js-client frameworks_ like `Vuejs`.

Class `oro-functions` extended from `oro-functions-client`. If you want to know all fns, read **[oro-functions-client](https://github.com/oropesa/oro-functions-client/)**.

## Installation

```shell
npm install oro-functions
```

## Example:
```js
const Ofn = require( 'oro-functions' );

Ofn.type( [ 1, 2, 3 ] );
// 'array'
```

## Methods

<hr>

### Oro Functions Client

In **Ofn** there are allowed all _functions_ of [Oro Functions Client](https://github.com/oropesa/oro-functions-client).

<hr>

### Extended Functions

### URLs

<hr>

#### Ofn.jwkTokenDecode( token )

```js
Ofn.jwkTokenDecode( 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoib3JvcGVzYSIsImlhdCI6MTYyOTcxMzM2MywiZXhwIjoxNjI5NzIwNTYzfQ.2zL8FzvFQCtuqi0fFoby4QVCXSi2pWNS3bzCU53Vd4M' );
// '{"user":"oropesa","iat":1629713363,"exp":1629720563}'
```

### Crypto

<hr>

#### Ofn.cryptoGenerateKeyPair( passphrase = '', options = {} )

```js
await Ofn.cryptoGenerateKeyPair( passphrase = '', options = {} )
// {
//   publicKey: '-----BEGIN RSA PUBLIC KEY-----',
//   privateKey: '-----BEGIN RSA PRIVATE KEY-----'
// }
```

* **Default options**
```js
options = {
    type: 'rsa', // 'rsa', 'rsa-pss', 'dsa', 'ec', 'ed25519', 'ed448', 'x25519', 'x448', 'dh'.
    modulusLength: 4096,
    publicKeyEncodingType: 'spki', // 'pkcs1' (RSA only) or 'spki'.
    publicKeyEncodingFormat: 'pem', // 'pem', 'der', or 'jwk'.
    privateKeyEncodingType: 'pkcs8', // 'pkcs1' (RSA only), 'pkcs8' or 'sec1' (EC only).
    privateKeyEncodingFormat: 'pem', // 'pem', 'der', or 'jwk'.
    privateKeyEncodingCipher: 'aes-256-cbc', // 'aes-256-cbc', 'des-cbc-sha', 'rc4-128-md5', ...
}
```

### Files

<hr>

#### await Ofn.obtainOroConfig( args )
#### Ofn.obtainOroConfigSync( args )

Put yourself in this situation, you work with _Git_ and you create a _modules_ or _projects_ 
that need the common file `.env` to use _custom variables_, 
with data to, i.e., connect in _dbs_, _users-passwords_, _dev-pro_ or other _envs_, _custom configs_.

Then, you have something like:

````shell
- parent-folder/
  ├─ project-1/  #git-project-1
  │   └...
  ├─ project-2/  #git-project-2
  │   └...
  └...
````

Instead of create _global variables_ in the system, or duplicate the file `.env`, you can centralize 
all data in `oro-config.json`.

This file, `oro-config.json`, could be in the same project and in the parents folders too, 
in such a way that the _final json_ is merged and overwritten from the parents to the project.

So, using this example, you have:

````shell
- parent-folder/
  ├─ project-1/
  │   ├─ oro-config.json #json of project 1
  │   └...
  ├─ project-2/
  │   ├─ oro-config.json #json of project 2
  │   └...
  ├─ oro-config.json #son of parent-folder (w/o git)
  └...
````

Continuing, the `oro-config.json` files have the next data:

````js
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
````

Finally, the result is:

```js
/* Inside the project 1 */

let obtainConfig = await Ofn.obtainOroConfig( { deep: 1 } );
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

/* Inside the project 2 */

let obtainConfig = await Ofn.obtainOroConfig( { deep: 1 } );
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

* **Default args**

```js
let args = {
  file: 'oro-config.json',
  deep: 0,
  defaultParams: [ 'environment', 'projectname', 'projectserver' ],
  extraParams: []
}
```

By default, there are 3 _params_ that are required in the _json_: `environment`, `projectname`, `projectserver`.

So, if there are missing, the _response_ of `Ofn.obtainOroConfig()` is `{ status: false, ... }`.

For one have, you can change the `defaultParams`, or you can add `extraParams` to be required.

For other hand, you can change de `file` name to search, so instead of `oro-config.json`, you can use `custom.json`.

Finally, you choose the `deep` from parents to look for.

<hr>

#### await Ofn.getFileJsonRecursively( filenameOrPath, parentDeep = 0 )
#### Ofn.getFileJsonRecursivelySync( filenameOrPath, parentDeep = 0 )

Having this case:

````shell
- main/
  ├─ folder/
  │   ├─ subfolder/
  │   │   ├─ index.js 
  │   │   └─ custom.json 
  │   └ custom.json 
  └ custom.json 
````

The _final json_ is merged and overwritten from the parents to the project.

```js
// in index.js
let custom = await Ofn.getFileJsonRecursively( 'custom.json', 2 );
// { ... } 
```

<hr>

#### await Ofn.globFiles( folderPath, globArgs = {} )

```js
await Ofn.globFiles( `folder/*` );
// [
//   `folder/example.txt`,
//   ...
// ]
```

* **Default args**
  
`Ofn.globFiles` is a wrapper of the lib [fast-glob](https://www.npmjs.com/package/fast-glob) with _default args_.

You can read how it works to update `globArgs`.

```js
globArgs = {
    dot: true,
    unique: true,
    onlyFiles: true,
    ignore: [ "node_modules/**", ".zero/**" ]
}
```

<hr>

#### await Ofn.folderIsEmpty( folderPath, globArgs = {} )

```js
await Ofn.folderIsEmpty( `folder/` ); // false
```

`Ofn.folderIsEmpty` uses the lib [fast-glob](https://www.npmjs.com/package/fast-glob) with _default args_.

You can read how it works to update `globArgs`.

* **Default args**

```js
globArgs = {
    dot: true,
    unique: true,
    onlyFiles: true,
    ignore: [ "node_modules/**", ".zero/**" ]
}
```

<hr>

#### await Ofn.pathIsFolder( path )

```js
await Ofn.pathIsFolder( `folder` ); // true
```

<hr>

#### await Ofn.zipFolder( folderPath, zipPath, compressionLevel = undefined )

```js
await Ofn.zipFolder( `folder`, 'folder.zip' ); 
// { status: true, zipPath: 'folder.zip' }
```

<hr>

### Operating System

#### Ofn.osPlatform()

```js
Ofn.osPlatform(); // 'win32' || 'darwin' || 'linux'
```

<hr>

#### Ofn.osIsWindows()

```js
Ofn.osIsWindows(); // true
```

<hr>

#### Ofn.osIsMac()

```js
Ofn.osIsMac(); // false
```

<hr>

#### Ofn.osIsLinux()

```js
Ofn.osIsLinux(); // true
```

### Ports

<hr>

#### await Ofn.isPortAvailable( port )

```js
await Ofn.isPortAvailable( 3000 ); 
// { status: true, port: 3000 }
```

<hr>

#### await Ofn.getPortFree( portStart = null, portEnd = null )

```js
await Ofn.getPortFree(); 
// { status: true, port: 60247 } #random

await Ofn.getPortFree( 3000 ); 
// { status: true, port: 3000 } #if not allowed, return random

await Ofn.getPortFree( [ 3000, 3001, 3002 ] ); 
// { status: true, port: 3000 }
// { status: false, error: { msg: 'No available ports in array [ 3000, 3001, 3002 ]' } }

await Ofn.getPortFree( 3000, 3100 ); 
// { status: true, port: 3000 }
// { status: false, error: { msg: 'No available ports in range 3000-3100' } }
```

### Console

<hr>

#### Ofn.processWrite( strOrObject, color = '', bg = '' )

```js
Ofn.processWrite( 'info', 'blue' );
Ofn.processWrite( ' Doing some stuff... ' );

Ofn.processWrite( { s: 'Error!', c: 'red', b: 'redlight' } );
Ofn.processWrite( '\n' );
```

* **Example:**

![Example Console - Process Write](https://oropensando.com/extrafiles/oro-functions/console-process-write.png)

Note: first param could be a `string` or an `object`

* **Allowed Object:**
  * `s`, `str`, or `string`
  * `c`, `cl`, or `color`
  * `b`, `bg`, or `background`


* **Allowed Colors and Background:**
  * `gray`
  * `red`
  * `green`
  * `white`
  * `yellow`
  * `blue`
  * `redlight`
  * `bluelight`

<hr>

#### Ofn.processWrites( arr )

```js
Ofn.processWrites( [ 
  { s: ' info ', c: 'blue', b: 'bluelight' }, 
  ' Doing some stuff... ',
  { s: 'Error!', c: 'red', b: 'redlight' }, 
  '\n'
] );
```

* **Example:**

![Example Console - Process Writes](https://oropensando.com/extrafiles/oro-functions/console-process-writes.png)
