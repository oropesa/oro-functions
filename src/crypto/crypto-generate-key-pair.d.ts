import { SResponse } from 'oro-functions-client';

export interface CryptoKeyPairObject {
  passphrase: string;
  publicKey: string;
  privateKey: string;
}

export interface CryptoKeyPairError {
  msg: string;
  err: Error;
}

export type CryptoKeyPairResponse = SResponse<CryptoKeyPairObject, CryptoKeyPairError>;

export interface CryptoKeyPairOptions {
  type?: string;
  modulusLength?: number;
  publicKeyEncodingType?: string;
  publicKeyEncodingFormat?: string;
  privateKeyEncodingType?: string;
  privateKeyEncodingFormat?: string;
  privateKeyEncodingCipher?: string;
}

export type cryptoGenerateKeyPair = (
  passphrase?: string,
  options?: CryptoKeyPairOptions
) => Promise<CryptoKeyPairResponse>