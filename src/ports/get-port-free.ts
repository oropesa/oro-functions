import { getPort } from 'get-port-please';
import { isNully, isArray, isNumeric, setResponseKO, setResponseOK } from 'oro-functions-client';
import type { GetPortOptions } from 'get-port-please';
import type { SResponseKOObject, SResponseOKObject } from 'oro-functions-client';

export interface PortFreeObject {
  port: number;
}

export type GetPortFreeOptions = Partial<
  Pick<GetPortOptions, 'random' | 'port' | 'ports' | 'portRange' | 'host'>
>;

export interface GetPortFreeError {
  msg: string;
  port?: number;
  opts?: GetPortFreeOptions;
  err?: Error;
}

export type GetPortFreeResponse =
  | SResponseOKObject<PortFreeObject>
  | SResponseKOObject<GetPortFreeError>;

export async function getPortFree(
  portStart?: number | number[],
  portEnd?: number,
  host = 'localhost',
): Promise<GetPortFreeResponse> {
  let opts: GetPortFreeOptions = { host, random: true };

  if (!isNully(portEnd)) {
    let start = Number(portStart);
    let end = Number(portEnd);

    if (!isNumeric(portEnd)) {
      return setResponseKO(`param:portEnd must be a number. portEnd: ${portEnd}`);
    }

    if (!portStart || isArray(portStart) || !isNumeric(portStart)) {
      return setResponseKO(
        `param:portStart must be a number when portEnd is enabled. portStart: ${portStart}`,
      );
    }

    start > end && ([start, end] = [end, start]);

    opts.random = false;
    opts.port = start;
    opts.portRange = [start, end];
  }

  if (!isNully(portStart)) {
    if (isArray(portStart)) {
      if (portStart.length === 0) {
        return setResponseKO(`param:portStart Array must have numbers.`);
      }

      for (const arrayPort of portStart) {
        if (!isNumeric(arrayPort)) {
          opts.ports = portStart;
          return setResponseKO(`param:portStart Array must have only numbers, not: ${arrayPort}`, {
            opts,
          });
        }
      }
    } else if (!isNumeric(portStart)) {
      return setResponseKO(`param:portStart must be a number. portStart: ${portStart}`);
    }

    //

    opts.random = false;

    if (isArray(portStart)) {
      opts.port = portStart[0];
      opts.ports = portStart;
    } else {
      opts.port = portStart;
    }
  }

  const response = await getPort(opts)
    .then((port) => {
      return setResponseOK({ port });
    })
    .catch((error: Error) => {
      if (opts.ports?.length) {
        return setResponseKO(`No available ports in array [ ${opts.ports.join(', ')} ]`, {
          opts,
          err: error,
        });
      }

      if (opts.portRange?.length) {
        return setResponseKO(`No available ports in range ${opts.portRange.join('-')}`, {
          opts,
          err: error,
        });
      }

      return setResponseKO('No available ports', { opts, err: error });
    });

  if (!response.status) {
    // when input is only a number (port), instead to error, returns a random port
    if (!isArray(portStart) && isNumeric(Number(portStart)) && !isNumeric(Number(portEnd))) {
      return getPortFree();
    }

    return response;
  }

  return response;
}
