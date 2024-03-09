import os from 'node:os';

import { osPlatform } from './os-platform';

describe('fn: osPlatform', () => {
  test('fn: osPlatform( undefined )', () => {
    expect(osPlatform()).toBe(os.platform());
  });
});
