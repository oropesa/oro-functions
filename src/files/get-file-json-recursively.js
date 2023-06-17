const fsExtra = require( 'fs-extra' );
const {
    isString,
    isNumeric,
    getFilenameByPath,
    getFolderByPath,
    mergeObjectsDeep,
} = require( 'oro-functions-client/src' );

const getFileJsonRecursively = async function( filenameOrPath, parentDeep = 0 ) {
    if( ! isString( filenameOrPath ) ) { return {}; }
    if( ! isNumeric( parentDeep ) ) { parentDeep = 0; }

    let filename = getFilenameByPath( filenameOrPath );
    filenameOrPath === filename && ( parentDeep += 2 );
    let folder = filenameOrPath === filename ? __filename : filenameOrPath;
    let jsonOutput = {};

    do {
        folder = getFolderByPath( folder )
        const jsonFile = await fsExtra.readJson( `${folder}/${filename}` ).catch( e => {} );
        if( jsonFile ) { jsonOutput = mergeObjectsDeep( jsonFile, jsonOutput ); }

        parentDeep--;
    }
    while( parentDeep >= 0 );

    return jsonOutput;
}

const getFileJsonRecursivelySync = function( filenameOrPath, parentDeep = 0 ) {
    if( ! isString( filenameOrPath ) ) { return {}; }
    if( ! isNumeric( parentDeep ) ) { parentDeep = 0; }

    let filename = getFilenameByPath( filenameOrPath );
    filenameOrPath === filename && ( parentDeep += 2 );
    let folder = filenameOrPath === filename ? __filename : filenameOrPath;
    let jsonOutput = {};

    do {
        folder = getFolderByPath( folder );
        try {
            const jsonFile = fsExtra.readJsonSync( `${folder}/${filename}` );
            jsonOutput = mergeObjectsDeep( {}, jsonFile, jsonOutput );
        }
        catch( e ) {}

        parentDeep--;
    }
    while( parentDeep >= 0 );

    return jsonOutput;
}

module.exports = { getFileJsonRecursively, getFileJsonRecursivelySync };