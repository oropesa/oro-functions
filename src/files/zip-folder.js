const zip = require( 'zip-lib' );
const fsExtra = require( 'fs-extra' );
const { pathIsFolder } = require( './path-is-folder' );
const {
    isString,
    isNully,
    sanitizePath,
    setResponseKO,
    setResponseOK,
} = require( 'oro-functions-client/src' );

const zipFolder = async function( folderPath, zipPath ) {
    if( ! isString( folderPath ) ) {
        return setResponseKO( 'zipFolder failed, param:folderPath is string required.' );
    }

    folderPath = sanitizePath( folderPath );

    if( isNully( zipPath ) ) {
        zipPath = `${folderPath.slice( -1 ) === '/'
                     ? folderPath.slice( 0, folderPath.length - 1 ) 
                     : folderPath}.zip`
    }

    if( ! isString( zipPath ) ) {
        return setResponseKO( 'zipFolder failed, param:zipPath is string required.' );
    }

    if( ! await fsExtra.exists( folderPath ) ) {
        return setResponseKO( 'zipFolder failed, folderPath not exist.', { folderPath } );
    }

    await fsExtra.remove( zipPath );

    if( await pathIsFolder( folderPath ) ) {
        folderPath.slice( -1 ) !== '/' && ( folderPath += '/' );

        if( zipPath.indexOf( folderPath ) !== -1 ) {
            return setResponseKO(
                `zipFolder Error: Source and target folder must be different.`, { folderPath, zipPath } )
        }

        let response = await zip.archiveFolder( folderPath, zipPath )
            .then( () => setResponseOK() )
            .catch( e => setResponseKO( `zipFolder ${e.toString()}`, { folderPath, zipPath } ) );

        if( ! response.status ) { return response; }
    }
    else {
        let response = await zip.archiveFile( folderPath, zipPath )
            .then( () => setResponseOK() )
            .catch( e => setResponseKO( `zipFolder ${e.toString()}`, { folderPath, zipPath } ) );

        if( ! response.status ) { return response; }
    }

    return await fsExtra.exists( zipPath )
           ? setResponseOK( { zipPath } )
           : setResponseKO( 'File zip not exists (maybe for permissions issue).', { zipPath } );
}

module.exports = { zipFolder };