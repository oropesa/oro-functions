const { getPort } = require( 'get-port-please' );
const {
    isNully,
    isArray,
    isNumberic,
    setResponseKO,
    setResponseOK,
} = require( 'oro-functions-client/src' );

const getPortFree = async function( portStart = null, portEnd = null ) {
    let opts = { random: true };

    if( ! isNully( portEnd ) ) {
        if( ! isNumberic( portEnd ) ) {
            return setResponseKO( `param:portEnd must be a number. portEnd: ${portEnd}` );
        }

        if( ! isNumberic( portStart ) ) {
            return setResponseKO( `param:portStart must be a number when portEnd is enabled. portStart: ${portStart}` );
        }

        portStart > portEnd && ( [ portStart, portEnd ] = [ portEnd, portStart ] );

        opts.random = false;
        opts.port = portStart;
        opts.portRange = [ portStart, portEnd ];
    }

    if( ! isNully( portStart ) ) {
        if( isArray( portStart ) ) {
            if( ! portStart.length ) { return setResponseKO( `param:portStart Array must have numbers.` ); }

            for( const arrPort of portStart ) {
                if( ! isNumberic( arrPort ) ) {
                    opts.ports = portStart;
                    return setResponseKO( `param:portStart Array must have only numbers, not: ${arrPort}`, { opts } );
                }
            }
        }
        else if( ! isNumberic( portStart ) ) {
            return setResponseKO( `param:portStart must be a number. portStart: ${portStart}` );
        }

        //

        opts.random = false;

        if( isArray( portStart ) ) {
            opts.port = portStart[ 0 ];
            opts.ports = portStart;
        }
        else {
            opts.port = portStart
        }
    }

    let response = await getPort( opts )
        .then( port => { return setResponseOK( { port } ) } )
        .catch( err => { return setResponseKO( `No available ports`, { err } ); } );

    if( ! response.status ) { return response; }

    if( opts.ports && opts.ports.length && ! opts.ports.includes( response.port ) ) {
        return setResponseKO(
            `No available ports in array [ ${opts.ports.join( ', ' )} ]`, { port: response.port, opts } );
    }

    if( opts.portRange && opts.portRange.length && ! ( opts.portRange[ 0 ] <= response.port && opts.portRange[ 1 ] >= response.port ) ) {
        return setResponseKO(
            `No available ports in range ${opts.portRange.join( '-' )}`, { port: response.port, opts } );
    }

    return response;
}

module.exports = { getPortFree };