import { osIsWindows } from '../platforms';
import { execCommand } from './exec-command';

describe('fn: execCommand', () => {
  test('fn: execCommand( empty-string )', async () => {
    const error = new Error('ExecCommand failed: command is string required.');
    await expect(execCommand('')).rejects.toEqual(error);
  });

  test('fn: execCommand( wrong-string )', async () => {
    const command = 'lsssssss';
    const error = new Error(
      `ExecCommand failed with exit code ${osIsWindows() ? '1' : '127'}. \r\nExecCommand: "${command}"`,
    );
    await expect(execCommand(command)).rejects.toEqual(error);
  });

  test('fn: execCommand( command )', async () => {
    const command = osIsWindows() ? 'cd' : 'pwd';
    expect(await execCommand(command)).toEqual(process.cwd());
  });

  test('fn: execCommand( command, inheritShell )', async () => {
    const command = osIsWindows() ? 'cd' : 'pwd';
    expect(await execCommand(command, true)).toEqual(undefined);
  });
});
