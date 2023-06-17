const { globFiles } = require( './glob-files' );
const {
    isString,
    isArray,
    isObject,
    sanitizePath,
} = require( 'oro-functions-client/src' );

const folderIsEmpty = async function( folderPath, globArgs = {} ) {
    if( ! isString( folderPath ) && ! isArray( folderPath ) ) { return null; }
    if( ! isObject( globArgs ) ) { globArgs = {}; }

    const args = Object.assign( {
        dot: true,
        unique: true,
        onlyFiles: true,
        ignore: [ "node_modules/**", ".zero/**" ]
    }, globArgs );

    folderPath = isString( folderPath ) ? sanitizePath( folderPath ) : folderPath.map( path => sanitizePath( path ) );

    return ! ( await globFiles( folderPath, args ) ).length;
}

module.exports = { folderIsEmpty };