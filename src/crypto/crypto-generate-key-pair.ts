import crypto from 'node:crypto';
import { isObject, cloneObject, setResponseOK, setResponseKO } from 'oro-functions-client';
import type { SResponseKOObject, SResponseOKObject } from 'oro-functions-client';

export interface CryptoKeyPairObject {
  passphrase: string;
  publicKey: string;
  privateKey: string;
}

export interface CryptoKeyPairError {
  msg: string;
  err: Error;
}

export type CryptoKeyPairResponse =
  | SResponseOKObject<CryptoKeyPairObject>
  | SResponseKOObject<CryptoKeyPairError>;

export type CryptoKeyPairType =
  | 'rsa'
  | 'rsa-pss'
  | 'dsa'
  | 'ec'
  | 'ed25519'
  | 'ed448'
  | 'x25519'
  | 'x448'
  | 'dh';

export interface CryptoKeyPairOptions {
  type?: CryptoKeyPairType;
  modulusLength?: number;
  publicKeyEncodingType?: string;
  publicKeyEncodingFormat?: string;
  privateKeyEncodingType?: string;
  privateKeyEncodingFormat?: string;
  privateKeyEncodingCipher?: string;
}

export async function cryptoGenerateKeyPair(
  passphrase = '',
  options: CryptoKeyPairOptions = {},
): Promise<CryptoKeyPairResponse> {
  const opts = isObject(options) ? options : {};

  const data: Required<CryptoKeyPairOptions> = {
    type: 'rsa', // 'rsa', 'rsa-pss', 'dsa', 'ec', 'ed25519', 'ed448', 'x25519', 'x448', 'dh'.
    modulusLength: 4096,
    publicKeyEncodingType: 'pkcs1', // 'pkcs1' (RSA only) or 'spki'.
    publicKeyEncodingFormat: 'pem', // 'pem', 'der', or 'jwk'.
    privateKeyEncodingType: 'pkcs1', // 'pkcs1' (RSA only), 'pkcs8' or 'sec1' (EC only).
    privateKeyEncodingFormat: 'pem', // 'pem', 'der', or 'jwk'.
    privateKeyEncodingCipher: 'aes-256-cbc', // 'aes-256-cbc', 'des-cbc-sha', 'rc4-128-md5', ...

    ...cloneObject(opts),
  };

  return new Promise<CryptoKeyPairResponse>((resolve, reject) => {
    crypto.generateKeyPair(
      data.type as any,
      {
        modulusLength: data.modulusLength,
        publicKeyEncoding: {
          type: data.publicKeyEncodingType,
          format: data.publicKeyEncodingFormat,
        },
        privateKeyEncoding: {
          type: data.privateKeyEncodingType,
          format: data.privateKeyEncodingFormat,
          cipher: data.privateKeyEncodingCipher,
          passphrase,
        },
      },
      (error: Error | null, publicKey: any, privateKey: any) => {
        if (error) {
          reject(error);
          return;
        }

        return resolve(setResponseOK({ passphrase, publicKey, privateKey }));
      },
    );
  }).catch((error) => setResponseKO({ msg: error.toString(), err: error }));
}
