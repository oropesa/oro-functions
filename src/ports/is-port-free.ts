import { checkPort } from 'get-port-please';
import { isNumeric, setResponseOK, setResponseKO } from 'oro-functions-client';
import type { PortFreeObject } from './get-port-free';
import type { SResponseOKObject, SResponseKOObject } from 'oro-functions-client';

export interface IsPortFreeError {
  msg: string;
  port: number;
}

export type IsPortFreeResponse =
  | SResponseOKObject<PortFreeObject>
  | SResponseKOObject<IsPortFreeError>;

export async function isPortFree(port: number, host = 'localhost'): Promise<IsPortFreeResponse> {
  if (!isNumeric(port)) {
    return setResponseKO('Unrecognize port', { port });
  }

  return await checkPort(Number(port), host).then((result) =>
    result
      ? setResponseOK({ port: result })
      : setResponseKO(`Port already in use: ${port}.`, { port }),
  );
}

// @deprecated
export async function isPortAvailable(port: number): Promise<IsPortFreeResponse> {
  return await isPortFree(port);
}
