const { isPortFree } = require('./is-port-free');

describe('fn: isPortFree', () => {
  test('fn: isPortFree( port string )', async () => {
    const port = '3100';
    const response = await isPortFree(port);
    expect(response).toEqual({ status: true, port: +port });
  });
});
