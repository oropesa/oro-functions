import { checkPort } from 'get-port-please';
import { isNumeric, setResponseKO, setResponseOK } from 'oro-functions-client';
import type { SResponseKOObject, SResponseOKObject } from 'oro-functions-client';

import type { PortFreeObject } from './get-port-free';

export interface IsPortFreeError {
  msg: string;
  port: number;
}

export type IsPortFreeResponse = SResponseOKObject<PortFreeObject> | SResponseKOObject<IsPortFreeError>;

export async function isPortFree(port: number, host = 'localhost'): Promise<IsPortFreeResponse> {
  if (!isNumeric(port)) {
    return setResponseKO('Unrecognize port', { port });
  }

  return await checkPort(Number(port), host).then((result) =>
    result ? setResponseOK({ port: result }) : setResponseKO(`Port already in use: ${port}.`, { port }),
  );
}

/**
 * @deprecated use `isPortFree` instead
 */
export async function isPortAvailable(port: number): Promise<IsPortFreeResponse> {
  return await isPortFree(port);
}
