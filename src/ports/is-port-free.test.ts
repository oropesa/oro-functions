import { runServer } from './_server.mocks';
import { isPortAvailable, isPortFree } from './is-port-free';

describe('fn: isPortFree', () => {
  test('fn: isPortFree( undefined )', async () => {
    expect(await isPortFree(Number.NaN)).toEqual({
      status: false,
      error: { msg: 'Unrecognize port', port: Number.NaN },
    });
  });

  test('fn: isPortFree( port used )', async () => {
    const port = 4080;
    const server = await runServer(port);
    const response = await isPortFree(port);
    server?.close();

    expect(response).toEqual({
      status: false,
      error: { msg: `Port already in use: ${port}.`, port },
    });
  });

  test('fn: isPortFree( port )', async () => {
    const port = 4101;
    const response = await isPortFree(port);
    expect(response).toEqual({ status: true, port });
  });
});

describe('fn: isPortAvailable', () => {
  test('fn: isPortAvailable( port )', async () => {
    const port = 4200;
    const response = await isPortAvailable(port);
    expect(response).toEqual({ status: true, port });
  });
});
