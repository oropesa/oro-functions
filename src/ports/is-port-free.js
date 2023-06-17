const { checkPort } = require( 'get-port-please' );
const {
    isNumeric,
    isNumber,
    setResponseOK,
    setResponseKO,
} = require( 'oro-functions-client/src' );

const isPortFree = async function( port ) {
    if( ! isNumeric( port ) ) {
        return setResponseKO( `Unrecognize port`, { port } );
    }

    ! isNumber( port ) && ( port = +port );

    return await checkPort( port )
        .then( result => result
            ? setResponseOK( { port: result } )
            : setResponseKO( `Port already in use: ${port}.`, { port } ) );
}

module.exports = { isPortFree, isPortAvailable: isPortFree };