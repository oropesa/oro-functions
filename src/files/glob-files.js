const fglob = require( 'fast-glob' );
const {
    isString,
    isArray,
    isObject,
    sanitizePath,
} = require( 'oro-functions-client/src' );

const globFiles = async function( folderPath, globArgs = {} ) {
    if( ! isString( folderPath ) && ! isArray( folderPath ) ) { return []; }
    if( ! isObject( globArgs ) ) { globArgs = {}; }

    const args = Object.assign( {
        dot: true,
        unique: true,
        onlyFiles: true,
        ignore: [ "node_modules/**", ".zero/**" ]
    }, globArgs );

    folderPath = isString( folderPath ) ? sanitizePath( folderPath ) : folderPath.map( path => sanitizePath( path ) );

    return fglob( folderPath, args );
}

module.exports = { globFiles };