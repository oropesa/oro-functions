const { getFileJsonRecursively, getFileJsonRecursivelySync } = require( './get-file-json-recursively' );
const {
    isObject,
    getFilenameByPath,
    getFolderByPath,
    arrayGetUnique,
    type,
    setResponseKO,
    setResponseOK,
} = require( 'oro-functions-client/src' );

const obtainOConfig = async function( args = {} ) {
    if( ! isObject( args ) ) {
        return setResponseKO( 'obtainOConfig args failed: must be an object.', { args } );
    }

    const {
        file = 'oro-config.json',
        deep = 0,
        defaultParams = [ 'environment', 'projectname', 'projectserver' ],
        extraParams = []
    } = args;

    let filename = getFilenameByPath( file );
    let filepath = filename === file ? getFolderByPath( getFolderByPath( __dirname ) ): getFolderByPath( file );
    let params = arrayGetUnique( [].concat(
        type( defaultParams ) === 'array' ? defaultParams : [],
        type( extraParams ) === 'array' ? extraParams : []
    ) );

    let config = await getFileJsonRecursively( file, deep );

    for( const param of params ) {
        if( ! config[ param ] ) {
            return setResponseKO(
                `Miss param:${param} on ${filepath}/${filename} deep ${deep}`,
                { args: { file, deep, defaultParams, extraParams } }
            );
        }
    }

    return setResponseOK( { config } );
};

const obtainOConfigSync = function( args = {} ) {
    if( ! isObject( args ) ) {
        return setResponseKO( 'obtainOConfigSync args failed: must be an object.', { args } );
    }

    const {
        file = 'oro-config.json',
        deep = 0,
        defaultParams = [ 'environment', 'projectname', 'projectserver' ],
        extraParams = []
    } = args;

    let filename = getFilenameByPath( file );
    let filepath = filename === file ? getFolderByPath( getFolderByPath( __dirname ) ): getFolderByPath( file );
    let params = arrayGetUnique( [].concat(
        type( defaultParams ) === 'array' ? defaultParams : [],
        type( extraParams ) === 'array' ? extraParams : []
    ) );

    let config = getFileJsonRecursivelySync( file, deep );

    for( const param of params ) {
        if( ! config[ param ] ) {
            return setResponseKO(
                `Miss param:${param} on ${filepath}/${filename} deep ${deep}`,
                { args: { file, deep, defaultParams, extraParams } }
            );
        }
    }

    return setResponseOK( { config } );
};

module.exports = {
    obtainOConfig,
    obtainOConfigSync,
    obtainOroConfig: obtainOConfig,
    obtainOroConfigSync: obtainOConfigSync,
};