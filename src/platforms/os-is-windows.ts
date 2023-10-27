import { osPlatform } from './os-platform';

export function osIsWindows(): boolean {
  return osPlatform() === 'win32';
}
