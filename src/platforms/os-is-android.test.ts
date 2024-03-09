import os from 'node:os';

import { osIsAndroid } from './os-is-android';

describe('fn: osIsAndroid', () => {
  test('fn: osIsAndroid( undefined )', () => {
    expect(osIsAndroid()).toBe(os.platform() === 'android');
  });
});
