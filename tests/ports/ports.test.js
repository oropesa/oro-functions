const http = require('node:http');
const { Ofn } = require('../../dist');

function runServer(port) {
  try {
    const server = http.createServer((req, res) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Hello World');
    });
    server.listen(port, '127.0.0.1', () => {});
    server.on('error', () => {});
    return server;
  } catch {}
}

describe('fn: isPortFree', () => {
  test('fn: isPortFree( undefined )', async () => {
    expect(await Ofn.isPortFree()).toEqual({
      status: false,
      error: { msg: 'Unrecognize port', port: undefined },
    });
  });

  test('fn: isPortFree( port used )', async () => {
    const port = 80;
    const server = runServer(port);
    const response = await Ofn.isPortFree(port);
    server && server.close();

    expect(response).toEqual({
      status: false,
      error: { msg: `Port already in use: ${port}.`, port: port },
    });
  });

  test('fn: isPortFree( port )', async () => {
    const port = 3100;
    const response = await Ofn.isPortFree(port);
    expect(response).toEqual({ status: true, port: port });
  });

  test('fn: isPortFree( port string )', async () => {
    const port = '3100';
    let response = await Ofn.isPortFree(port);
    expect(response).toEqual({ status: true, port: +port });
  });
});

describe('fn: getPortFree', () => {
  test('fn: getPortFree( undefined )', async () => {
    let response = await Ofn.getPortFree();

    expect(response.status).toBe(true);
    expect(Ofn.type(response.port)).toBe('number');
  });

  test('fn: getPortFree( port )', async () => {
    expect(await Ofn.getPortFree(3000)).toEqual({ status: true, port: 3000 });
  });

  test('fn: getPortFree( port ) bussy', async () => {
    const port = 80;
    const server = runServer(port);
    const response = await Ofn.getPortFree(port);
    server && server.close();

    expect(response.status).toBe(true);
    expect(response.port).not.toBe(port);
  });

  test('fn: getPortFree( port arr )', async () => {
    let ports = [3100, 3101, 3102];
    let response = await Ofn.getPortFree(ports);

    expect(response.status).toBe(true);
    expect(ports.includes(response.port)).toBe(true);
  });

  test('fn: getPortFree( port arr bad )', async () => {
    let ports = [80];
    const server = runServer(ports[0]);
    let response = await Ofn.getPortFree(ports);
    server && server.close();

    expect(response.status).toBe(false);
    expect(response.error.msg).toBe('No available ports in array [ 80 ]');
  });

  test('fn: getPortFree( port bad )', async () => {
    expect(await Ofn.getPortFree(true)).toEqual({
      status: false,
      error: { msg: 'param:portStart must be a number. portStart: true' },
    });
  });

  test('fn: getPortFree( port-end bad )', async () => {
    expect(await Ofn.getPortFree(3100, true)).toEqual({
      status: false,
      error: { msg: 'param:portEnd must be a number. portEnd: true' },
    });
  });

  test('fn: getPortFree( port, port )', async () => {
    let response = await Ofn.getPortFree(3100, 3200);

    expect(response.status).toBe(true);
    expect(response.port).toBeGreaterThanOrEqual(3100);
    expect(response.port).toBeLessThanOrEqual(3200);
  });

  test('fn: getPortFree( port, port ) full', async () => {
    const port = 80;
    const server = runServer(port);
    let response = await Ofn.getPortFree(port, port);
    server && server.close();

    expect(response.status).toBe(false);
    expect(response.error.msg).toBe(`No available ports in range ${port}-${port}`);
  });
});
