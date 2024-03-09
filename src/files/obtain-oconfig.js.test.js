import { obtainOConfig, obtainOConfigSync } from './obtain-oconfig';

const TEST_PATH = `${__dirname}/__tests__`;

describe('fn: obtainOConfig', () => {
  test('fn: obtainOConfig( str )', async () => {
    expect(await obtainOConfig('chacho')).toEqual({
      status: false,
      error: { msg: 'obtainOConfig args failed: must be an object.', args: 'chacho' },
    });
  });

  test('fn: obtainOConfig( wrong params } )', async () => {
    const obtainingConfig = await obtainOConfig({
      file: `${TEST_PATH}/assets-js/prj1/oconfig.json`,
      defaultParams: 'wrong-params',
      extraParams: 'wrong-params',
    });

    expect(obtainingConfig.status).toBe(true);

    if (!obtainingConfig.status) {
      return;
    }

    expect(obtainingConfig).toEqual({
      status: true,
      config: {
        environment: 'PRO',
        projectname: 'test-project',
      },
    });
  });
});

describe('fn: obtainOConfigSync', () => {
  test('fn: obtainOConfigSync( str )', () => {
    expect(obtainOConfigSync('chacho')).toEqual({
      status: false,
      error: { msg: 'obtainOConfigSync args failed: must be an object.', args: 'chacho' },
    });
  });

  test('fn: obtainOConfigSync( wrong params } )', async () => {
    const obtainingConfig = obtainOConfigSync({
      file: `${TEST_PATH}/assets-js/prj1/oconfig.json`,
      defaultParams: 'wrong-params',
      extraParams: 'wrong-params',
    });

    expect(obtainingConfig.status).toBe(true);

    if (!obtainingConfig.status) {
      return;
    }

    expect(obtainingConfig).toEqual({
      status: true,
      config: {
        environment: 'PRO',
        projectname: 'test-project',
      },
    });
  });
});
