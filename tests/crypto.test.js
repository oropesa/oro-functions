const Ofn = require( '../index' );

describe('fn: cryptoGenerateKeyPair', () => {
    test( 'fn: cryptoGenerateKeyPair( undefined )', async () => {
        let response = await Ofn.cryptoGenerateKeyPair();

        expect( response.status ).toBe( true );
        expect( response.passphrase ).toBe( '' );
        expect( response.publicKey.split( `\n` )[ 0 ] ).toBe( '-----BEGIN RSA PUBLIC KEY-----' );
        expect( response.privateKey.split( `\n` )[ 0 ] ).toBe( '-----BEGIN RSA PRIVATE KEY-----' );
    } );

    test( 'fn: cryptoGenerateKeyPair( bad options )', async () => {
        let response = await Ofn.cryptoGenerateKeyPair( '', { publicKeyEncodingType: 'chacho' } );

        expect( response.status ).toBe( false );
        expect( response.error.msg ).toBe(
            'TypeError [ERR_INVALID_OPT_VALUE]: The value "chacho" is invalid for option "publicKeyEncoding.type"' );
    } );
});
