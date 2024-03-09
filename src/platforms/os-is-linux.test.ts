import os from 'node:os';

import { osIsLinux } from './os-is-linux';

describe('fn: osIsLinux', () => {
  test('fn: osIsLinux( undefined )', () => {
    expect(osIsLinux()).toBe(os.platform() === 'linux');
  });
});
