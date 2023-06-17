import Ofn from '../../index';

const TOKEN_JWK: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoib3JvcGVzYSIsImlhdCI6MTYyOTcxMzM2MywiZXhwIjoxNjI5NzIwNTYzfQ.2zL8FzvFQCtuqi0fFoby4QVCXSi2pWNS3bzCU53Vd4M';
const TOKEN_JWK_PARTIAL: string = 'eyJ1c2VyIjoib3JvcGVzYSIsImlhdCI6MTYyOTcxMzM2MywiZXhwIjoxNjI5NzIwNTYzfQ';

describe( 'fn: jwkTokenDecode', () => {
    test( 'fn: jwkTokenDecode( undefined )', () => {
        expect( Ofn.jwkTokenDecode( undefined ) ).toBe( '' );
    } );
    test( 'fn: jwkTokenDecode( str bad )', () => {
        expect( Ofn.jwkTokenDecode( 'chacho' ) ).toBe( '' );
    } );
    test( 'fn: jwkTokenDecode( str )', () => {
        expect( Ofn.jwkTokenDecode( TOKEN_JWK ) )
            .toBe( '{"user":"oropesa","iat":1629713363,"exp":1629720563}' );
    } );
    test( 'fn: jwkTokenDecode( str2 )', () => {
        expect( Ofn.jwkTokenDecode( TOKEN_JWK_PARTIAL ) )
            .toBe( '{"user":"oropesa","iat":1629713363,"exp":1629720563}' );
    } );
} );