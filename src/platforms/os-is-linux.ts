import { osPlatform } from './os-platform';

export function osIsLinux(): boolean {
  return osPlatform() === 'linux';
}
