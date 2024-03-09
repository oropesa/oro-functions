import { runServer } from './_server.mocks';
import { getPortFree } from './get-port-free';

describe('fn: getPortFree', () => {
  test('fn: getPortFree( undefined )', async () => {
    const response = await getPortFree();

    expect(response.status).toBe(true);

    if (!response.status) {
      return;
    }

    expect(typeof response.port).toBe('number');
  });

  test('fn: getPortFree( port )', async () => {
    expect(await getPortFree(4000)).toEqual({ status: true, port: 4000 });
  });

  test('fn: getPortFree( port ) bussy', async () => {
    const port = 4081;
    const server = await runServer(port);
    const response = await getPortFree(port);
    server?.close();

    expect(response.status).toBe(true);

    if (!response.status) {
      return;
    }

    expect(response.port).not.toBe(port);
  });

  test('fn: getPortFree( port arr )', async () => {
    const ports = [4100, 4101, 4102];
    const response = await getPortFree(ports);

    expect(response.status).toBe(true);

    if (!response.status) {
      return;
    }

    expect(ports.includes(response.port)).toBe(true);
  });

  test('fn: getPortFree( port arr bad )', async () => {
    const ports = [4080];
    const server = await runServer(ports[0]);
    const response = await getPortFree(ports);
    server?.close();

    expect(response.status).toBe(false);

    if (response.status) {
      return;
    }

    expect(response.error.msg).toBe('No available ports in array [ 4080 ]');
  });

  test('fn: getPortFree( port, port )', async () => {
    const response = await getPortFree(4100, 4200);

    expect(response.status).toBe(true);

    if (!response.status) {
      return;
    }

    expect(response.port).toBeGreaterThanOrEqual(4100);
    expect(response.port).toBeLessThanOrEqual(4200);
  });

  test('fn: getPortFree( port, port ) inverse', async () => {
    const response = await getPortFree(4200, 4100);

    expect(response.status).toBe(true);

    if (!response.status) {
      return;
    }

    expect(response.port).toBeGreaterThanOrEqual(4100);
    expect(response.port).toBeLessThanOrEqual(4200);
  });

  test('fn: getPortFree( port, port ) full', async () => {
    const port = 4080;
    const server = await runServer(port);
    const response = await getPortFree(port, port);
    server?.close();

    if (response.status) {
      return;
    }

    expect(response.status).toBe(false);
    expect(response.error.msg).toBe(`No available ports in range ${port}-${port}`);
  });
});
