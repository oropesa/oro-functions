import { getPortFree } from './get-port-free';

describe('fn: getPortFree', () => {
  test('fn: getPortFree( port bad )', async () => {
    expect(await getPortFree(true)).toEqual({
      status: false,
      error: { msg: 'param:portStart must be a number. portStart: true' },
    });
  });

  test('fn: getPortFree( port-end bad )', async () => {
    expect(await getPortFree(3100, true)).toEqual({
      status: false,
      error: { msg: 'param:portEnd must be a number. portEnd: true' },
    });
  });

  test('fn: getPortFree( port-start bad )', async () => {
    expect(await getPortFree(undefined, 3100)).toEqual({
      status: false,
      error: { msg: `param:portStart must be a number when portEnd is enabled. portStart: undefined` },
    });
  });

  test('fn: getPortFree( ports-array empty )', async () => {
    expect(await getPortFree([])).toEqual({
      status: false,
      error: { msg: `param:portStart Array must have numbers.` },
    });
  });

  test('fn: getPortFree( ports-array bad )', async () => {
    expect(await getPortFree([3100, true])).toEqual({
      status: false,
      error: {
        msg: `param:portStart Array must have only numbers, not: true`,
        opts: {
          host: 'localhost',
          ports: [3100, true],
          random: true,
        },
      },
    });
  });
});
