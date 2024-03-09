import { getFileJsonRecursively, getFileJsonRecursivelySync } from './get-file-json-recursively';

// eslint-disable-next-line unicorn/prefer-module
const TEST_PATH = `${__dirname}/__tests__`;

describe('fn: getFileJsonRecursively', () => {
  test('fn: getFileJsonRecursively( undefined )', async () => {
    expect(await getFileJsonRecursively(undefined)).toEqual({});
  });

  test('fn: getFileJsonRecursively( not str )', async () => {
    expect(await getFileJsonRecursively([])).toEqual({});
  });

  test('fn: getFileJsonRecursively( path, deep bad )', async () => {
    expect(await getFileJsonRecursively(`${TEST_PATH}/assets-js/prj1/custom-config.json`, true)).toEqual({
      custom: { tio: true },
    });
  });
});

describe('fn: getFileJsonRecursivelySync', () => {
  test('fn: getFileJsonRecursivelySync( undefined )', () => {
    expect(getFileJsonRecursivelySync(undefined)).toEqual({});
  });
  test('fn: getFileJsonRecursivelySync( not str )', () => {
    expect(getFileJsonRecursivelySync([])).toEqual({});
  });

  test('fn: getFileJsonRecursivelySync( path, deep bad )', () => {
    expect(getFileJsonRecursivelySync(`${TEST_PATH}/assets-js/prj1/custom-config.json`, true)).toEqual({
      custom: { tio: true },
    });
  });
});
