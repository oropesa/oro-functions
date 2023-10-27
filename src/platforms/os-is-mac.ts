import { osPlatform } from './os-platform';

export function osIsMac(): boolean {
  return osPlatform() === 'darwin';
}
