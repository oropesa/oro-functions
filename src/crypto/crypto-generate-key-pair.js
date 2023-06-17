const crypto = require( 'crypto' );
const {
    isObject,
    cloneObject,
    setResponseOK,
    setResponseKO
} = require( 'oro-functions-client/src' );

const cryptoGenerateKeyPair = async function( passphrase = '', options = {} ) {
    ! isObject( options ) && ( options = {} );

    const data = Object.assign( {
        type: 'rsa', // 'rsa', 'rsa-pss', 'dsa', 'ec', 'ed25519', 'ed448', 'x25519', 'x448', 'dh'.
        modulusLength: 4096,
        publicKeyEncodingType: 'pkcs1', // 'pkcs1' (RSA only) or 'spki'.
        publicKeyEncodingFormat: 'pem', // 'pem', 'der', or 'jwk'.
        privateKeyEncodingType: 'pkcs1', // 'pkcs1' (RSA only), 'pkcs8' or 'sec1' (EC only).
        privateKeyEncodingFormat: 'pem', // 'pem', 'der', or 'jwk'.
        privateKeyEncodingCipher: 'aes-256-cbc', // 'aes-256-cbc', 'des-cbc-sha', 'rc4-128-md5', ...
    }, cloneObject( options ) );

    return new Promise( ( resolve, reject ) =>
        crypto.generateKeyPair( data.type, {
            modulusLength: data.modulusLength,
            publicKeyEncoding: { type: data.publicKeyEncodingType, format: data.publicKeyEncodingFormat },
            privateKeyEncoding: {
                type: data.privateKeyEncodingType,
                format: data.privateKeyEncodingFormat,
                cipher: data.privateKeyEncodingCipher,
                passphrase
            }
        }, ( err, publicKey, privateKey ) => {
            if( err ) { reject( err ); return; }

            return resolve( setResponseOK( { passphrase, publicKey, privateKey } ) );
        } ) )
        .catch( err => setResponseKO( err.toString(), { err } ) );
}

module.exports = { cryptoGenerateKeyPair };