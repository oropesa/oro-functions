const {
    isObject,
    isArray,
} = require( 'oro-functions-client/src' );

const COLORS = { 'gray': 90, 'red': 91, 'green': 92, 'white': 93, 'yellow': 93, 'blue': 94, 'redlight': 95, 'bluelight': 96 };
const BGS = { 'gray': 100, 'red': 101, 'green': 102, 'white': 103, 'yellow': 103, 'blue': 104, 'redlight': 105, 'bluelight': 106 };

function colorize( output, color ) {
    return [ '\x1b[', color, 'm', output, '\x1b[0m' ].join( '' );
}

const processWrite = function( strOrObject, color = '', bg = '' )  {
    const config = { string: '', color: '', background: '' };
    if( isObject( strOrObject ) ) {
        strOrObject.s !== undefined      && ( config.string = strOrObject.s );
        strOrObject.str !== undefined    && ( config.string = strOrObject.str );
        strOrObject.string !== undefined && ( config.string = strOrObject.string )

        strOrObject.c !== undefined     && ( config.color = strOrObject.c );
        strOrObject.cl !== undefined    && ( config.color = strOrObject.cl );
        strOrObject.color !== undefined && ( config.color = strOrObject.color );

        strOrObject.b !== undefined          && ( config.background = strOrObject.b );
        strOrObject.bg !== undefined         && ( config.background = strOrObject.bg );
        strOrObject.background !== undefined && ( config.background = strOrObject.background );
    }
    else {
        config.string = strOrObject + '';
        config.color = color;
        config.background = bg;
    }

    COLORS[ config.color ] !== undefined && ( config.string = colorize( config.string, COLORS[ config.color ] ) );
    BGS[ config.background ] !== undefined && ( config.string = colorize( config.string, BGS[ config.background ] ) );

    process.stdout.write( config.string );
    return config.string;
}

const processWrites = function( arr )  {
    if( ! isArray( arr ) ) { return ''; }

    let string = '';
    for( const elem of arr ) {
        string += processWrite( elem );
    }

    return string;
}

module.exports = { processWrite, processWrites };