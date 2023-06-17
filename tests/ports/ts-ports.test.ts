import { createServer, Server } from 'http';
import Ofn from '../../index';

function runServer( port: number ): Server {
    try {
        const server = createServer( ( req, res ) => {
            res.statusCode = 200;
            res.setHeader( 'Content-Type', 'text/plain' );
            res.end( 'Hello World' );
        } );
        server.listen( port, '127.0.0.1', () => {} );
        server.on( 'error', () => {} );
        return server;
    }
    catch {
    }
}

describe( 'fn: isPortFree', () => {
    test( 'fn: isPortFree( undefined )', async() => {
        expect( await Ofn.isPortFree( undefined ) ).toEqual( {
            status: false,
            error: { msg: 'Unrecognize port', port: undefined }
        } );
    } );

    test( 'fn: isPortFree( port used )', async() => {
        const port = 80;
        const server = runServer( port );
        const response = await Ofn.isPortFree( port );
        server.close();

        expect( response ).toEqual( { status: false, error: { msg: `Port already in use: ${port}.`, port: port } } );
    } );

    test( 'fn: isPortFree( port )', async() => {
        const port = 4100;
        const response = await Ofn.isPortFree( port );
        expect( response ).toEqual( { status: true, port: port } );
    } );

    // test( 'fn: isPortFree( port string )', async () => {
    //     const port = '3200';
    //     let response = await Ofn.isPortFree( port );
    //     expect( response ).toEqual( { status: true, port: +port } );
    // } );
} );

describe( 'fn: getPortFree', () => {
    test( 'fn: getPortFree( undefined )', async() => {
        let response = await Ofn.getPortFree();

        expect( response.status ).toBe( true );

        if( response.status === false ) {
            return;
        }

        expect( Ofn.type( response.port ) ).toBe( 'number' );
    } );

    test( 'fn: getPortFree( port )', async() => {
        expect( await Ofn.getPortFree( 4000 ) ).toEqual( { status: true, port: 4000 } );
    } );

    test( 'fn: getPortFree( port )', async() => {
        const port = 80;
        const server = runServer( port );
        const response = await Ofn.getPortFree( port );
        server.close();

        expect( response.status ).toBe( true );

        if( response.status === false ) {
            return;
        }

        expect( response.port ).not.toBe( port );
    } );

    test( 'fn: getPortFree( port arr )', async() => {
        let ports = [ 4100, 4101, 4102 ];
        let response = await Ofn.getPortFree( ports );

        expect( response.status ).toBe( true );

        if( response.status === false ) {
            return;
        }

        expect( ports.includes( response.port ) ).toBe( true );
    } );

    test( 'fn: getPortFree( port arr bad )', async() => {
        let ports = [ 80 ];
        const server = runServer( ports[ 0 ] );
        let response = await Ofn.getPortFree( ports );
        server.close();

        expect( response.status ).toBe( false );

        if( response.status === true ) {
            return;
        }

        expect( response.error.msg ).toBe( 'No available ports in array [ 80 ]' );
    } );

    // test( 'fn: getPortFree( port bad )', async () => {
    //     expect( await Ofn.getPortFree( true ) ).toEqual( {
    //         status: false,
    //         error: { msg: "param:portStart must be a number. portStart: true" }
    //     } );
    // } );

    // test( 'fn: getPortFree( port-end bad )', async () => {
    //     expect( await Ofn.getPortFree( 3100, true ) ).toEqual( {
    //         status: false,
    //         error: { msg: "param:portEnd must be a number. portEnd: true" }
    //     } );
    // } );

    test( 'fn: getPortFree( port, port )', async() => {
        let response = await Ofn.getPortFree( 4100, 4200 );

        expect( response.status ).toBe( true );

        if( response.status === false ) {
            return;
        }

        expect( response.port ).toBeGreaterThanOrEqual( 4100 );
        expect( response.port ).toBeLessThanOrEqual( 4200 );
    } );

    test( 'fn: getPortFree( port, port ) full', async() => {
        const port = 80;
        const server = runServer( port );
        let response = await Ofn.getPortFree( port, port );
        server.close();

        if( response.status === true ) {
            return;
        }

        expect( response.status ).toBe( false );
        expect( response.error.msg ).toBe( `No available ports in range ${port}-${port}` );
    } );
} );