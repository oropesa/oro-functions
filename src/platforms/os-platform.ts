import os from 'node:os';

export function osPlatform(): NodeJS.Platform {
  return os.platform();
}
