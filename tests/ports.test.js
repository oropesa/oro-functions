const Ofn = require( '../index' );

describe('fn: isPortAvailable', () => {
    test( 'fn: isPortAvailable( undefined )', async () => {
        expect( await Ofn.isPortAvailable() ).toEqual( { status: false, error: { msg: 'Unrecognize port', port: undefined } } );
    } );

    test( 'fn: isPortAvailable( port used )', async () => {
        let response = await Ofn.isPortAvailable( 80 );
        expect( response ).toEqual( { status: false, error: { msg: "Port already in use: 80.", port: 80 } } );
    } );

    test( 'fn: isPortAvailable( port )', async () => {
        let response = await Ofn.isPortAvailable( 3100 );
        expect( response ).toEqual( { status: true, port: 3100 } );
    } );

    test( 'fn: isPortAvailable( port string )', async () => {
        let response = await Ofn.isPortAvailable( '3100' );
        expect( response ).toEqual( { status: true, port: 3100 } );
    } );
});

describe('fn: getPortFree', () => {
    test( 'fn: getPortFree( undefined )', async () => {
        let response = await Ofn.getPortFree();

        expect( response.status ).toBe( true );
        expect( Ofn.type( response.port ) ).toBe( 'number' );
    } );

    test( 'fn: getPortFree( port )', async () => {
        expect( await Ofn.getPortFree( 3000 ) ).toEqual( { status: true, port: 3000 } );
    } );

    test( 'fn: getPortFree( port )', async () => {
        expect( await Ofn.getPortFree( 80 ) ).toEqual( { status: true, port: 3000 } );
    } );

    test( 'fn: getPortFree( port arr )', async () => {
        let ports = [ 3100, 3101, 3102 ];
        let response = await Ofn.getPortFree( ports );

        expect( response.status ).toBe( true );
        expect( ports.includes( response.port ) ).toBe( true );
    } );

    test( 'fn: getPortFree( port arr bad )', async () => {
        let ports = [ 80 ];
        let response = await Ofn.getPortFree( ports );

        expect( response.status ).toBe( false );
        expect( response.error.msg ).toBe( 'No available ports in array [ 80 ]' );
    } );

    test( 'fn: getPortFree( port bad )', async () => {
        expect( await Ofn.getPortFree( true ) ).toEqual( { status: false, error: { msg: "param:portStart must be a number." } } );
    } );

    test( 'fn: getPortFree( port-end bad )', async () => {
        expect( await Ofn.getPortFree( 3100, true ) ).toEqual( { status: false, error: { msg: "param:portEnd must be a number." } } );
    } );

    test( 'fn: getPortFree( port, port )', async () => {
        let response = await Ofn.getPortFree( 3100, 3200 );
console.log( response );
        expect( response.status ).toBe( true );
        expect( response.port ).toBeGreaterThanOrEqual( 3100 );
        expect( response.port ).toBeLessThanOrEqual( 3200 );
    } );

    test( 'fn: getPortFree( port, port ) full', async () => {
        let response = await Ofn.getPortFree( 80, 80 );

        expect( response.status ).toBe( false );
        expect( response.error.msg ).toBe( 'No available ports in range 80-80' );
    } );
});