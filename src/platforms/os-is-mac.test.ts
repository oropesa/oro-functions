import os from 'node:os';

import { osIsMac } from './os-is-mac';

describe('fn: osIsMac', () => {
  test('fn: osIsMac( undefined )', () => {
    expect(osIsMac()).toBe(os.platform() === 'darwin');
  });
});
