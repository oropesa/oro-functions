import { objIsNotEmpty } from 'oro-functions-client';

import { getFileJsonRecursively, getFileJsonRecursivelySync } from './get-file-json-recursively';

const TEST_PATH = `${__dirname}/__tests__`;

describe('fn: getFileJsonRecursively', () => {
  test('fn: getFileJsonRecursively( path )', async () => {
    interface Custom {
      custom: { chacho?: boolean; tio?: boolean };
    }

    const obj = await getFileJsonRecursively<Custom>(`${TEST_PATH}/assets/prj1/custom-config.json`);

    expect(obj).toEqual({ custom: { tio: true } });
  });

  test('fn: getFileJsonRecursively( path, deep )', async () => {
    interface Custom {
      environment: string;
      custom: { chacho?: boolean; tio?: boolean };
    }

    const obj = await getFileJsonRecursively<Custom>(`${TEST_PATH}/assets/prj1/custom-config.json`, 2);

    expect(obj).toEqual({ environment: 'DEV', custom: { chacho: true, tio: true } });

    if (!objIsNotEmpty(obj)) {
      return;
    }

    expect(obj.environment).toBe('DEV');
  });
});

describe('fn: getFileJsonRecursivelySync', () => {
  test('fn: getFileJsonRecursivelySync( path )', () => {
    interface Custom {
      custom: { chacho?: boolean; tio?: boolean };
    }

    const obj = getFileJsonRecursivelySync<Custom>(`${TEST_PATH}/assets/prj1/custom-config.json`);
    expect(obj).toEqual({ custom: { tio: true } });
  });

  test('fn: getFileJsonRecursivelySync( path, deep )', () => {
    interface Custom {
      environment: string;
      custom: { chacho?: boolean; tio?: boolean };
    }

    const obj = getFileJsonRecursivelySync<Custom>(`${TEST_PATH}/assets/prj1/custom-config.json`, 2);
    expect(obj).toEqual({ environment: 'DEV', custom: { chacho: true, tio: true } });
  });
});
