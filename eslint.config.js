import {
  DEFAULT_IGNORES,
  setEslintLanguageOptionsBrowser,
  setEslintPluginJest,
  setEslintPluginJestDom,
  setEslintPluginPrettier,
  setEslintPluginTypescriptEslint,
  setEslintPluginUnicorn,
} from './eslint.config.utils.js';

const allowList = ['fn', 'tmp', 'obj', 'str', 'req', 'res', 'opts', 'args', 'Args', 'param', 'params', 'Params'];

export default [
  { ignores: DEFAULT_IGNORES },
  setEslintLanguageOptionsBrowser(),
  setEslintPluginUnicorn({ allowList }),
  setEslintPluginJest(),
  setEslintPluginJestDom(),
  setEslintPluginPrettier(),
  ...setEslintPluginTypescriptEslint({
    rules: {
      'no-empty': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  }),
];
