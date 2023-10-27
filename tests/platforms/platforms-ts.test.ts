import os from 'node:os';
import Ofn from '../../dist';

describe('fn: osPlatform', () => {
  test('fn: osPlatform( undefined )', () => {
    expect(Ofn.osPlatform()).toBe(os.platform());
  });
});

describe('fn: osIsWindows', () => {
  test('fn: osIsWindows( undefined )', () => {
    expect(Ofn.osIsWindows()).toBe(os.platform() === 'win32');
  });
});

describe('fn: osIsMac', () => {
  test('fn: osIsMac( undefined )', () => {
    expect(Ofn.osIsMac()).toBe(os.platform() === 'darwin');
  });
});

describe('fn: osIsLinux', () => {
  test('fn: osIsLinux( undefined )', () => {
    expect(Ofn.osIsLinux()).toBe(os.platform() === 'linux');
  });
});

describe('fn: osIsAndroid', () => {
  test('fn: osIsAndroid( undefined )', () => {
    expect(Ofn.osIsAndroid()).toBe(os.platform() === 'android');
  });
});
