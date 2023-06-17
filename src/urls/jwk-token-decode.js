const { isString } = require( 'oro-functions-client/src' );

const jwkTokenDecode = function( token ) {
    if( ! isString( token ) ) { return ''; }

    if( ! global.atob ) {
        global.atob = require( 'atob' );
    }

    token.indexOf( '.' ) !== -1 && ( token = token.split( '.' )[ 1 ] );

    try {
        return decodeURIComponent(
            atob( token.replace( '-', '+' ).replace( '_', '/' ) )
                .split( '' ).map( c => `%${('00' + c.charCodeAt( 0 ).toString( 16 )).slice( -2 )}` ).join( '' )
        );
    }
    catch( e ) { return ''; }
};

module.exports = { jwkTokenDecode };