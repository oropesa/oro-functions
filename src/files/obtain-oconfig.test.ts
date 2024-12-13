import { sanitizePath } from 'oro-functions-client';

import type { OConfigResponse } from './obtain-oconfig';
import { obtainOConfig, obtainOConfigSync, obtainOroConfig, obtainOroConfigSync } from './obtain-oconfig';

// eslint-disable-next-line unicorn/prefer-module
const TEST_PATH = `${__dirname}/__tests__`;

describe('fn: obtainOConfig', () => {
  test('fn: obtainOConfig( undefined )', async () => {
    const obtainingConfig: OConfigResponse = await obtainOConfig();

    expect(obtainingConfig.status).toBe(false);

    if (obtainingConfig.status) {
      return;
    }

    obtainingConfig.error.msg = obtainingConfig.error.msg.slice(0, obtainingConfig.error.msg.indexOf(' on') + 3);

    expect(obtainingConfig.error).toEqual({
      msg: 'Miss param:environment on',
      args: {
        deep: 0,
        defaultParams: ['environment', 'projectname', 'projectserver'],
        extraParams: [],
        file: 'oconfig.json',
      },
    });
  });

  test('fn: obtainOConfig( { file } } )', async () => {
    const obtainingConfig: OConfigResponse = await obtainOConfig({
      file: `${TEST_PATH}/assets/prj1/oconfig.json`,
    });

    expect(obtainingConfig.status).toBe(false);

    if (obtainingConfig.status) {
      return;
    }

    expect(obtainingConfig.error).toEqual({
      msg: `Miss param:projectserver on ${sanitizePath(TEST_PATH)}/assets/prj1/oconfig.json deep 0`,
      args: {
        deep: 0,
        defaultParams: ['environment', 'projectname', 'projectserver'],
        extraParams: [],
        file: `${TEST_PATH}/assets/prj1/oconfig.json`,
      },
    });
  });

  test('fn: obtainOConfig( { file, deep 1 } )', async () => {
    const obtainingConfig: OConfigResponse = await obtainOConfig({
      file: `${TEST_PATH}/assets/prj1/oconfig.json`,
      deep: 1,
    });

    if (!obtainingConfig.status) {
      return;
    }

    expect(obtainingConfig.config).toEqual({
      environment: 'PRO',
      projectname: 'test-project',
      projectserver: 'test-server',
    });
  });

  test('fn: obtainOConfig( { file custom, deep 1, defaultParams } )', async () => {
    const obtainingConfig: OConfigResponse = await obtainOConfig({
      file: `${TEST_PATH}/assets/prj1/custom-config.json`,
      deep: 1,
      defaultParams: ['environment'],
    });

    if (!obtainingConfig.status) {
      return;
    }

    expect(obtainingConfig.config).toEqual({
      environment: 'DEV',
      custom: { chacho: true, tio: true },
    });
  });

  test('fn: obtainOConfig( { file custom, deep 1, defaultParams none } )', async () => {
    const obtainingConfig: OConfigResponse = await obtainOConfig({
      file: `${TEST_PATH}/assets/prj1/oconfig.json`,
      deep: 1,
      extraParams: ['custom'],
    });

    if (obtainingConfig.status) {
      return;
    }

    expect(obtainingConfig.error).toEqual({
      msg: `Miss param:custom on ${sanitizePath(TEST_PATH)}/assets/prj1/oconfig.json deep 1`,
      args: {
        deep: 1,
        defaultParams: ['environment', 'projectname', 'projectserver'],
        extraParams: ['custom'],
        file: `${TEST_PATH}/assets/prj1/oconfig.json`,
      },
    });
  });
});

describe('fn: obtainOroConfig', () => {
  test('fn: obtainOroConfig( undefined )', async () => {
    const obtainingConfig: OConfigResponse = await obtainOroConfig();

    expect(obtainingConfig.status).toBe(false);

    if (obtainingConfig.status) {
      return;
    }

    obtainingConfig.error.msg = obtainingConfig.error.msg.slice(0, obtainingConfig.error.msg.indexOf(' on') + 3);

    expect(obtainingConfig.error).toEqual({
      msg: 'Miss param:environment on',
      args: {
        deep: 0,
        defaultParams: ['environment', 'projectname', 'projectserver'],
        extraParams: [],
        file: 'oro-config.json',
      },
    });
  });
});

describe('fn: obtainOConfigSync', () => {
  test('fn: obtainOConfigSync( undefined )', () => {
    const obtainingConfig: OConfigResponse = obtainOConfigSync();

    if (obtainingConfig.status) {
      return;
    }

    obtainingConfig.error.msg = obtainingConfig.error.msg.slice(0, obtainingConfig.error.msg.indexOf(' on') + 3);

    expect(obtainingConfig.error).toEqual({
      msg: 'Miss param:environment on',
      args: {
        deep: 0,
        defaultParams: ['environment', 'projectname', 'projectserver'],
        extraParams: [],
        file: 'oconfig.json',
      },
    });
  });

  test('fn: obtainOConfigSync( { file } } )', () => {
    const obtainingConfig: OConfigResponse = obtainOConfigSync({
      file: `${TEST_PATH}/assets/prj1/oconfig.json`,
    });

    if (obtainingConfig.status) {
      return;
    }

    expect(obtainingConfig.error).toEqual({
      msg: `Miss param:projectserver on ${sanitizePath(TEST_PATH)}/assets/prj1/oconfig.json deep 0`,
      args: {
        deep: 0,
        defaultParams: ['environment', 'projectname', 'projectserver'],
        extraParams: [],
        file: `${TEST_PATH}/assets/prj1/oconfig.json`,
      },
    });
  });

  test('fn: obtainOConfigSync( { file, deep 1 } )', () => {
    const obtainingConfig = obtainOConfigSync({
      file: `${TEST_PATH}/assets/prj1/oconfig.json`,
      deep: 1,
    });

    if (!obtainingConfig.status) {
      return;
    }

    expect(obtainingConfig.config).toEqual({
      environment: 'PRO',
      projectname: 'test-project',
      projectserver: 'test-server',
    });
  });

  test('fn: obtainOConfigSync( { file custom, deep 1, defaultParams } )', () => {
    const obtainingConfig = obtainOConfigSync({
      file: `${TEST_PATH}/assets/prj1/custom-config.json`,
      deep: 1,
      defaultParams: ['environment'],
    });

    if (!obtainingConfig.status) {
      return;
    }

    expect(obtainingConfig.config).toEqual({
      environment: 'DEV',
      custom: { chacho: true, tio: true },
    });
  });

  test('fn: obtainOConfigSync( { file custom, deep 1, defaultParams none } )', () => {
    const obtainingConfig = obtainOConfigSync({
      file: `${TEST_PATH}/assets/prj1/oconfig.json`,
      deep: 1,
      extraParams: ['custom'],
    });

    if (obtainingConfig.status) {
      return;
    }

    expect(obtainingConfig.error).toEqual({
      msg: `Miss param:custom on ${sanitizePath(TEST_PATH)}/assets/prj1/oconfig.json deep 1`,
      args: {
        deep: 1,
        defaultParams: ['environment', 'projectname', 'projectserver'],
        extraParams: ['custom'],
        file: `${TEST_PATH}/assets/prj1/oconfig.json`,
      },
    });
  });
});

describe('fn: obtainOroConfigSync', () => {
  test('fn: obtainOroConfigSync( undefined )', () => {
    const obtainingConfig: OConfigResponse = obtainOroConfigSync();

    if (obtainingConfig.status) {
      return;
    }

    obtainingConfig.error.msg = obtainingConfig.error.msg.slice(0, obtainingConfig.error.msg.indexOf(' on') + 3);

    expect(obtainingConfig.error).toEqual({
      msg: 'Miss param:environment on',
      args: {
        deep: 0,
        defaultParams: ['environment', 'projectname', 'projectserver'],
        extraParams: [],
        file: 'oro-config.json',
      },
    });
  });
});
