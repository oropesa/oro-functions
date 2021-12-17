const net = require( 'net' );
const zip = require( 'zip-lib' );
const crypto = require( 'crypto' );
const fglob = require( 'fast-glob' );
const fsExtra = require( 'fs-extra' );
const findPort = require( 'find-free-port' );
const OfnClient = require( 'oro-functions-client' );

global.atob = require( 'atob' );

class Ofn extends OfnClient {

    //region URLs

    static jwkTokenDecode( token ) {
        if( ! Ofn.isString( token ) ) { return ''; }

        token.indexOf( '.' ) !== -1 && ( token = token.split( '.' )[ 1 ] );

        try {
            return decodeURIComponent(
                atob( token.replace( '-', '+' ).replace( '_', '/' ) )
                    .split( '' ).map( c => `%${('00' + c.charCodeAt( 0 ).toString( 16 )).slice( -2 )}` ).join( '' )
            );
        }
        catch( e ) { return ''; }
    }

    //endregion
    //region Crypto

    static async cryptoGenerateKeyPair( passphrase = '', options = {} ) {
        ! Ofn.isObject( options ) && ( options = {} );

        const data = Object.assign( {
            type: 'rsa', // 'rsa', 'rsa-pss', 'dsa', 'ec', 'ed25519', 'ed448', 'x25519', 'x448', 'dh'.
            modulusLength: 4096,
            publicKeyEncodingType: 'pkcs1', // 'pkcs1' (RSA only) or 'spki'.
            publicKeyEncodingFormat: 'pem', // 'pem', 'der', or 'jwk'.
            privateKeyEncodingType: 'pkcs1', // 'pkcs1' (RSA only), 'pkcs8' or 'sec1' (EC only).
            privateKeyEncodingFormat: 'pem', // 'pem', 'der', or 'jwk'.
            privateKeyEncodingCipher: 'aes-256-cbc', // 'aes-256-cbc', 'des-cbc-sha', 'rc4-128-md5', ...
        }, Ofn.cloneObject( options ) );

        return new Promise( ( resolve, reject ) =>
            crypto.generateKeyPair( data.type, {
                modulusLength: data.modulusLength,
                publicKeyEncoding: { type: data.publicKeyEncodingType, format: data.publicKeyEncodingFormat },
                privateKeyEncoding: {
                    type: data.privateKeyEncodingType,
                    format: data.privateKeyEncodingFormat,
                    cipher: data.privateKeyEncodingCipher,
                    passphrase
                }
            }, ( err, publicKey, privateKey ) => {
                if( err ) { reject( err ); return; }

                return resolve( Ofn.setResponseOK( { passphrase, publicKey, privateKey } ) );
            } ) )
            .catch( err => Ofn.setResponseKO( err.toString() , { err } ) );
    }

    //endregion
    //region Files

    static async obtainOroConfig( args = {} ) {
        if( ! Ofn.isObject( args ) ) {
            return Ofn.setResponseKO( 'Ofn.obtainOroConfig args failed: must be an object.', { args } );
        }

        const {
            file = 'oro-config.json',
            deep = 0,
            defaultParams = [ 'environment', 'projectname', 'projectserver' ],
            extraParams = []
        } = args;

        let filename = Ofn.getFilenameByPath( file );
        let filepath = filename === file ? Ofn.getFolderByPath( Ofn.getFolderByPath( __dirname ) ): Ofn.getFolderByPath( file );
        let params = Ofn.arrayGetUnique( [].concat(
            Ofn.type( defaultParams ) === 'array' ? defaultParams : [],
            Ofn.type( extraParams ) === 'array' ? extraParams : []
        ) );

        let config = await Ofn.getFileJsonRecursively( file, deep );

        for( const param of params ) {
            if( ! config[ param ] ) {
                return Ofn.setResponseKO( `Miss param:${param} on ${filepath}/${filename} deep ${deep}`,
                    { file, deep, defaultParams, extraParams } );
            }
        }

        return Ofn.setResponseOK( { config } );
    }

    static obtainOroConfigSync( args = {} ) {
        if( ! Ofn.isObject( args ) ) {
            return Ofn.setResponseKO( 'Ofn.obtainOroConfigSync args failed: must be an object.', { args } );
        }

        const {
            file = 'oro-config.json',
            deep = 0,
            defaultParams = [ 'environment', 'projectname', 'projectserver' ],
            extraParams = []
        } = args;

        let filename = Ofn.getFilenameByPath( file );
        let filepath = filename === file ? Ofn.getFolderByPath( Ofn.getFolderByPath( __dirname ) ): Ofn.getFolderByPath( file );
        let params = Ofn.arrayGetUnique( [].concat(
            Ofn.type( defaultParams ) === 'array' ? defaultParams : [],
            Ofn.type( extraParams ) === 'array' ? extraParams : []
        ) );

        let config = Ofn.getFileJsonRecursivelySync( file, deep );

        for( const param of params ) {
            if( ! config[ param ] ) {
                return Ofn.setResponseKO( `Miss param:${param} on ${filepath}/${filename} deep ${deep}`,
                    { file, deep, defaultParams, extraParams } );
            }
        }

        return Ofn.setResponseOK( { config } );
    }

    static async getFileJsonRecursively( filenameOrPath, parentDeep = 0 ) {
        if( ! Ofn.isString( filenameOrPath ) ) { return {}; }
        if( ! Ofn.isNumeric( parentDeep ) ) { parentDeep = 0; }

        let filename = Ofn.getFilenameByPath( filenameOrPath );
        filenameOrPath === filename && ( parentDeep += 2 );
        let folder = filenameOrPath === filename ? __filename : filenameOrPath;
        let jsonOutput = {};

        do {
            folder = Ofn.getFolderByPath( folder )
            const jsonFile = await fsExtra.readJson( `${folder}/${filename}` ).catch( e => {} );
            if( jsonFile ) {
                jsonOutput = Ofn.mergeObjectsDeep( jsonFile, jsonOutput );
            }
            parentDeep--;
        } while( parentDeep >= 0 )

        return jsonOutput;
    }

    static getFileJsonRecursivelySync( filenameOrPath, parentDeep = 0 ) {
        if( ! Ofn.isString( filenameOrPath ) ) { return {}; }
        if( ! Ofn.isNumeric( parentDeep ) ) { parentDeep = 0; }

        let filename = Ofn.getFilenameByPath( filenameOrPath );
        filenameOrPath === filename && ( parentDeep += 2 );
        let folder = filenameOrPath === filename ? __filename : filenameOrPath;
        let jsonOutput = {};

        do {
            folder = Ofn.getFolderByPath( folder );
            try {
                const jsonFile = fsExtra.readJsonSync( `${folder}/${filename}` );
                jsonOutput = Ofn.mergeObjectsDeep( {}, jsonFile, jsonOutput );
            }
            catch( e ) {}

            parentDeep--;
        } while( parentDeep >= 0 )

        return jsonOutput;
    }

    static async globFiles( folderPath, globArgs = {} ) {
        if( ! Ofn.isString( folderPath ) && ! Ofn.isArray( folderPath ) ) { return []; }
        if( ! Ofn.isObject( globArgs ) ) { globArgs = {}; }

        const args = Object.assign( {
            dot: true,
            unique: true,
            onlyFiles: true,
            ignore: [ "node_modules/**", ".zero/**" ]
        }, globArgs );

        folderPath = Ofn.isString( folderPath ) ?
                        Ofn.sanitizePath( folderPath ) : folderPath.map( path => Ofn.sanitizePath( path ) );

        return fglob( folderPath, args );
    }

    static async pathIsFolder( path ) {
        if( ! Ofn.isString( path ) ) { return false; }

        return await fsExtra.exists( path ) && fsExtra.statSync( path ).isDirectory();
    }

    static async folderIsEmpty( folderPath, globArgs = {} ) {
        if( ! Ofn.isString( folderPath ) && ! Ofn.isArray( folderPath ) ) { return null; }
        if( ! Ofn.isObject( globArgs ) ) { globArgs = {}; }

        const args = Object.assign( {
            dot: true,
            unique: true,
            onlyFiles: true,
            ignore: [ "node_modules/**", ".zero/**" ]
        }, globArgs );

        folderPath = Ofn.isString( folderPath ) ? Ofn.sanitizePath( folderPath ) : folderPath.map( path => Ofn.sanitizePath( path ) );

        return ! ( await Ofn.globFiles( folderPath, args ) ).length;
    }

    static async zipFolder( folderPath, zipPath ) {
        if( ! Ofn.isString( folderPath ) ) {
            return Ofn.setResponseKO( 'Ofn.zipFolder failed, param:folderPath is string required.' );
        }

        folderPath = Ofn.sanitizePath( folderPath );

        if( Ofn.isNully( zipPath ) ) {
            zipPath = `${folderPath.substr( -1 ) === '/' ? 
                         folderPath.substr( 0, folderPath.length - 1 ) : folderPath}.zip`
        }

        if( ! Ofn.isString( zipPath ) ) {
            return Ofn.setResponseKO( 'Ofn.zipFolder failed, param:zipPath is string required.' );
        }

        if( ! await fsExtra.exists( folderPath ) ) {
            return Ofn.setResponseKO( 'Ofn.zipFolder failed, folderPath not exist.', { folderPath } );
        }

        await fsExtra.remove( zipPath );

        if( await Ofn.pathIsFolder( folderPath ) ) {
            folderPath.substr( -1 ) !== '/' && ( folderPath += '/' );

            if( zipPath.indexOf( folderPath ) !== -1 ) {
                return Ofn.setResponseKO(
                    `Ofn.zipFolder Error: Source and target folder must be different.`, { folderPath, zipPath } )
            }

            let response = await zip.archiveFolder( folderPath, zipPath ).then( () => Ofn.setResponseOK() )
                                    .catch( e => Ofn.setResponseKO(
                                        `Ofn.zipFolder ${e.toString()}`, { folderPath, zipPath } ) );
            if( ! response.status ) { return response; }
        }
        else {
            let response = await zip.archiveFile( folderPath, zipPath ).then( () => Ofn.setResponseOK() )
                                    .catch( e => Ofn.setResponseKO(
                                        `Ofn.zipFolder ${e.toString()}`, { folderPath, zipPath } ) );
            if( ! response.status ) { return response; }
        }

        return await fsExtra.exists( zipPath ) ?
               Ofn.setResponseOK( { zipPath } ) :
               Ofn.setResponseKO( 'File zip not exists (maybe for permissions issue).' );
    }

    //endregion
    //region Operating System

    static osPlatform()  { return process.platform; }
    static osIsWindows() { return process.platform === "win32" ; }
    static osIsMac()     { return process.platform === "darwin"; }
    static osIsLinux()   { return process.platform === "linux" ; }

    //endregion
    //region Ports

    static async isPortAvailable( port ) {
        if( ! Ofn.isNumeric( port ) ) { return Ofn.setResponseKO( `Unrecognize port`, { port } ); }

        return new Promise( ( resolve, reject ) => {
            const socket = net.connect( port );
            socket.on( 'connect', () => {
                socket.destroy(); resolve( Ofn.setResponseKO( 'Port already in use.' ) ); } );
            socket.on( 'error', err => {
                socket.destroy();
                return err.code === 'ECONNREFUSED' ?
                       resolve( Ofn.setResponseOK( { port } ) ) :
                       Ofn.setResponseKO( `Unrecognize error  ${err.code}`, { err } );
            } );
        } );
    }

    static async getPortFree( portStart = 3000, portEnd = 65535 ) {
        if( ! Ofn.isNumberic( portStart ) ) { return Ofn.setResponseKO( `param:portStart must be a number.` ) }
        if( ! Ofn.isNumberic( portEnd ) ) { return Ofn.setResponseKO( `param:portEnd must be a number.` ) }

        return await findPort( +portStart, +portEnd )
            .then( arr => { return Ofn.setResponseOK( { port: arr[ 0 ] } ) } )
            .catch( err => { return Ofn.setResponseKO( `No available ports in range ${portStart}-${portEnd}` ); } );
    }

    //endregion
    //region Console

    static processWrite( strOrObject, color = '', bg = '' )  {
        function colorize( output, color ) { return [ '\x1b[', color, 'm', output, '\x1b[0m' ].join( '' ); }
        const colors = { 'gray': 90, 'red': 91, 'green': 92, 'white': 93, 'yellow': 93, 'blue': 94, 'redlight': 95, 'bluelight': 96 };
        const bgs = { 'gray': 100, 'red': 101, 'green': 102, 'white': 103, 'yellow': 103, 'blue': 104, 'redlight': 105, 'bluelight': 106 };

        let config = { string: '', color: '', background: '' };
        if( Ofn.isObject( strOrObject ) ) {
            strOrObject.s !== undefined && ( config.string = strOrObject.s );
            strOrObject.str !== undefined && ( config.string = strOrObject.str );
            strOrObject.string !== undefined && ( config.string = strOrObject.string )

            strOrObject.c !== undefined && ( config.color = strOrObject.c );
            strOrObject.cl !== undefined && ( config.color = strOrObject.cl );
            strOrObject.color !== undefined && ( config.color = strOrObject.color );

            strOrObject.b !== undefined && ( config.background = strOrObject.b );
            strOrObject.bg !== undefined && ( config.background = strOrObject.bg );
            strOrObject.background !== undefined && ( config.background = strOrObject.background );
        }
        else {
            config.string = strOrObject + '';
            config.color = color;
            config.background = bg;
        }

        colors[ config.color ] !== undefined && ( config.string = colorize( config.string, colors[ config.color ] ) );
        bgs[ config.background ] !== undefined && ( config.string = colorize( config.string, bgs[ config.background ] ) );

        process.stdout.write( config.string );
        return config.string;
    }

    static processWrites( arr )  {
        if( ! Ofn.isArray( arr ) ) { return ''; }

        let string = '';
        for( const elem of arr ) {
            string += Ofn.processWrite( elem );
        }

        return string;
    }

    //endregion
}

module.exports = Ofn;