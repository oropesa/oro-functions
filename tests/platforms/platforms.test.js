const { Ofn } = require('../../dist');

describe('fn: osPlatform', () => {
  test('fn: osPlatform( undefined )', () => {
    expect(Ofn.osPlatform()).toBe(process.platform);
  });
});

describe('fn: osIsWindows', () => {
  test('fn: osIsWindows( undefined )', () => {
    expect(Ofn.osIsWindows()).toBe(process.platform === 'win32');
  });
});

describe('fn: osIsMac', () => {
  test('fn: osIsMac( undefined )', () => {
    expect(Ofn.osIsMac()).toBe(process.platform === 'darwin');
  });
});

describe('fn: osIsLinux', () => {
  test('fn: osIsLinux( undefined )', () => {
    expect(Ofn.osIsLinux()).toBe(process.platform === 'linux');
  });
});

describe('fn: osIsAndroid', () => {
  test('fn: osIsAndroid( undefined )', () => {
    expect(Ofn.osIsAndroid()).toBe(process.platform === 'android');
  });
});
