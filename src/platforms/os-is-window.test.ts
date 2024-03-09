import os from 'node:os';

import { osIsWindows } from './os-is-windows';

describe('fn: osIsWindows', () => {
  test('fn: osIsWindows( undefined )', () => {
    expect(osIsWindows()).toBe(os.platform() === 'win32');
  });
});
