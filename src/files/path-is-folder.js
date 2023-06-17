const fsExtra = require( 'fs-extra' );
const { isString } = require( 'oro-functions-client/src' );

const pathIsFolder = async function( path ) {
    if( ! isString( path ) ) { return false; }

    return await fsExtra.exists( path ) && fsExtra.statSync( path ).isDirectory();
}

module.exports = { pathIsFolder };