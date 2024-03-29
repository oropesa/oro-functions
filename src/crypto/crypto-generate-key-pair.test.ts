import type { CryptoKeyPairResponse } from './crypto-generate-key-pair';
import { cryptoGenerateKeyPair } from './crypto-generate-key-pair';

describe('fn: cryptoGenerateKeyPair', () => {
  test('fn: cryptoGenerateKeyPair( undefined )', async () => {
    const response: CryptoKeyPairResponse = await cryptoGenerateKeyPair();

    expect(response.status).toBe(true);

    if (!response.status) {
      return;
    }

    expect(response.passphrase).toBe('');
    expect(response.publicKey.split(`\n`)[0]).toBe('-----BEGIN RSA PUBLIC KEY-----');
    expect(response.privateKey.split(`\n`)[0]).toBe('-----BEGIN RSA PRIVATE KEY-----');
  });

  test('fn: cryptoGenerateKeyPair( bad options )', async () => {
    const response: CryptoKeyPairResponse = await cryptoGenerateKeyPair('', {
      publicKeyEncodingType: 'chacho',
    });

    expect(response.status).toBe(false);

    if (response.status) {
      return;
    }

    expect(response.error.msg).toBe(
      "TypeError [ERR_INVALID_ARG_VALUE]: The property 'options.publicKeyEncoding.type' is invalid. Received 'chacho'",
    );
  });
});
