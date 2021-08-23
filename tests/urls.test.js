const Ofn = require( '../index' );

describe('fn: jwkTokenDecode', () => {
    test( 'fn: jwkTokenDecode( undefined )' , () => { expect( Ofn.jwkTokenDecode() ).toBe( '' ); } );
    test( 'fn: jwkTokenDecode( str bad )'   , () => { expect( Ofn.jwkTokenDecode( 'chacho' ) ).toBe( '' ); } );
    test( 'fn: jwkTokenDecode( str )'   , () => {
        expect( Ofn.jwkTokenDecode( 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoib3JvcGVzYSIsImlhdCI6MTYyOTcxMzM2MywiZXhwIjoxNjI5NzIwNTYzfQ.2zL8FzvFQCtuqi0fFoby4QVCXSi2pWNS3bzCU53Vd4M' ) )
            .toBe(  '{"user":"oropesa","iat":1629713363,"exp":1629720563}' ); } );
    test( 'fn: jwkTokenDecode( str2 )'   , () => {
        expect( Ofn.jwkTokenDecode( 'eyJ1c2VyIjoib3JvcGVzYSIsImlhdCI6MTYyOTcxMzM2MywiZXhwIjoxNjI5NzIwNTYzfQ' ) )
            .toBe(  '{"user":"oropesa","iat":1629713363,"exp":1629720563}' ); } );
});