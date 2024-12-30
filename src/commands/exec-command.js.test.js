import { execCommand } from './exec-command';

describe('fn: execCommand', () => {
  test('fn: execCommand( undefined )', async () => {
    const error = new Error('ExecCommand failed: command is string required.');
    await expect(execCommand(undefined)).rejects.toEqual(error);
  });

  test('fn: execCommand( number )', async () => {
    const error = new Error('ExecCommand failed: command is string required.');
    await expect(execCommand(17)).rejects.toEqual(error);
  });
});
