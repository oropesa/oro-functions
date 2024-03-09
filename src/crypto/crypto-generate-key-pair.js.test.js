import { cryptoGenerateKeyPair } from './crypto-generate-key-pair';

describe('fn: cryptoGenerateKeyPair', () => {
  test('fn: cryptoGenerateKeyPair( wrong-param )', async () => {
    const response = await cryptoGenerateKeyPair(undefined, 'wrong-param');

    expect(response.status).toBe(true);

    if (!response.status) {
      return;
    }

    expect(response.passphrase).toBe('');
    expect(response.publicKey.split(`\n`)[0]).toBe('-----BEGIN RSA PUBLIC KEY-----');
    expect(response.privateKey.split(`\n`)[0]).toBe('-----BEGIN RSA PRIVATE KEY-----');
  });
});
