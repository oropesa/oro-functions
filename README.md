# Oro Functions

This package ( `oro-functions` ) is divided from `oro-functions-client` to allow using that functions on _js-client frameworks_ like `Vuejs`.

Class `oro-functions` extended from `oro-functions-client`. If you want to know all fns, read **[oro-functions-client](https://github.com/oropesa/oro-functions-client/)**.

Class Ofn with specific functions: 
* [URLs](#urls)
* [Crypto](#crypto)
* [Files](#files)
* [Operating System](#operating-system)
* [Ports](#ports)
* [Console](#console)

```shell
npm install oro-functions
```

```js
const Ofn = require( 'oro-functions' );
```

### URLs

```js
Ofn.jwkTokenDecode( token )
```


### Crypto

```js
//options = {
//    type: 'rsa', // 'rsa', 'rsa-pss', 'dsa', 'ec', 'ed25519', 'ed448', 'x25519', 'x448', 'dh'.
//    modulusLength: 4096,
//    publicKeyEncodingType: 'spki', // 'pkcs1' (RSA only) or 'spki'.
//    publicKeyEncodingFormat: 'pem', // 'pem', 'der', or 'jwk'.
//    privateKeyEncodingType: 'pkcs8', // 'pkcs1' (RSA only), 'pkcs8' or 'sec1' (EC only).
//    privateKeyEncodingFormat: 'pem', // 'pem', 'der', or 'jwk'.
//    privateKeyEncodingCipher: 'aes-256-cbc', // 'aes-256-cbc', 'des-cbc-sha', 'rc4-128-md5', ...
//}
await Ofn.cryptoGenerateKeyPair( passphrase = '', options = {} )
```

### Files

```js
//args = { 
//   file = 'oro-config.json', 
//   deep = 0, 
//   defaultParams = [ 'environment', 'projectname', 'projectserver' ], 
//   extraParams = [] 
//}
await Ofn.obtainOroConfig( args )
Ofn.obtainOroConfigSync( args )

await Ofn.getFileJsonRecursively( filenameOrPath, parentDeep = 0 )
Ofn.getFileJsonRecursivelySync( filenameOrPath, parentDeep = 0 )

//globArgs = {
//    dot: true,
//    unique: true,
//    onlyFiles: true,
//    ignore: [ "node_modules/**", ".zero/**" ]
//}
await Ofn.globFiles( folderPath, globArgs = {} )

await Ofn.pathIsFolder( path )

//globArgs = {
//    dot: true,
//    unique: true,
//    onlyFiles: true,
//    ignore: [ "node_modules/**", ".zero/**" ]
//}
await Ofn.folderIsEmpty( folderPath, globArgs = {} )

await Ofn.zipFolder( folderPath, zipPath, compressionLevel = undefined )
```

### Operating System

```js
Ofn.osPlatform()  // process.platform

Ofn.osIsWindows() // is "win32"
Ofn.osIsMac()     // is "darwin"
Ofn.osIsLinux()   // is "linux"
```

### Ports

```js
await Ofn.isPortAvailable( port )
await Ofn.getPortFree( portStart = 3000, portEnd = 65535 )
```

### Console

```js
// Ofn.processWrite( { s: 'info', c: 'blue' } )
// Ofn.processWrite( ' Doing some stuff... ' )
// ...
// Ofn.processWrite( { s: 'Error!', c: 'red', b: 'redlight' } )
// Ofn.processWrite( '\n' )
Ofn.processWrite( strOrObject, color = '', bg = '' )

// Ofn.processWrites( [ { s: 'info', c: 'blue' }, ' Doing some stuff... ' ] )
// ...
// Ofn.processWrites( [ { s: 'Error!', c: 'red', b: 'redlight' }, '\n' ] )
Ofn.processWrites( arr )
```
