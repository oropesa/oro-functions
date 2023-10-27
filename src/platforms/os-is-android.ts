import { osPlatform } from './os-platform';

export function osIsAndroid(): boolean {
  return osPlatform() === 'android';
}
