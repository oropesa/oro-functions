const Ofn = require( '../index' );

describe('fn: isPortAvailable', () => {
    test( 'fn: isPortAvailable( undefined )', async () => {
        expect( await Ofn.isPortAvailable() ).toEqual( { status: false, error: { msg: 'Unrecognize port', port: undefined } } ); } );
    test( 'fn: isPortAvailable( port used )', async () => {
        expect( await Ofn.isPortAvailable( 80 ) ).toEqual( { status: false, error: { msg: "Port already in use." } } ); } );
    test( 'fn: isPortAvailable( port )', async () => {
        expect( await Ofn.isPortAvailable( 3100 ) ).toEqual( { status: true, port: 3100 } ); } );
});

describe('fn: getPortFree', () => {
    test( 'fn: getPortFree( undefined )', async () => {
        expect( await Ofn.getPortFree() ).toEqual( { status: true, port: 3000 } ); } );
    test( 'fn: getPortFree( port bad )', async () => {
        expect( await Ofn.getPortFree( true ) ).toEqual( { status: false, error: { msg: "param:portStart must be a number." } } ); } );
    test( 'fn: getPortFree( port bad )', async () => {
        expect( await Ofn.getPortFree( 3100, true ) ).toEqual( { status: false, error: { msg: "param:portEnd must be a number." } } ); } );
    test( 'fn: getPortFree( port )', async () => {
        expect( await Ofn.getPortFree( 3100, 3200 ) ).toEqual( { status: true, port: 3100 } ); } );
    test( 'fn: getPortFree( port )', async () => {
        expect( await Ofn.getPortFree( 80, 80 ) ).toEqual( { status: false, error: { msg: 'No available ports in range 80-80' } } ); } );
});