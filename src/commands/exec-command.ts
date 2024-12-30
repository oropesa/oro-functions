import { spawn } from 'node:child_process';
import { isString } from 'oro-functions-client';

export interface execCommandOptions {
  inheritShell?: boolean;
}

interface execCommandNoShellOptions {
  inheritShell?: false;
}

interface execCommandShellOptions {
  inheritShell: true;
}

export function execCommand(command: string, options?: execCommandNoShellOptions): Promise<string>;
export function execCommand(command: string, options: execCommandShellOptions): Promise<undefined>;
export function execCommand(command: string, options: execCommandOptions = {}): Promise<string | undefined> {
  const inheritShell = options?.inheritShell ?? false;

  return new Promise((resolve, reject) => {
    if (!command || !isString(command)) {
      reject(new Error('ExecCommand failed: command is string required.'));
      return;
    }

    let output = '';

    const [instruction, ...args] = command.trim().split(' ');
    const child = spawn(instruction, args, { shell: true, stdio: inheritShell ? 'inherit' : undefined });

    child.stdout?.on('data', (data) => {
      output += `${data}`;
    });

    child.stderr?.on('data', (data) => {
      output += `${data}`;
    });

    child.on('close', (code) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      code === 0
        ? resolve(inheritShell ? undefined : output.trim())
        : reject(new Error(`ExecCommand failed with exit code ${code}. \r\nExecCommand: "${command}"`));
    });
  });
}

export function execCommandShell(command: string): Promise<undefined> {
  return execCommand(command, { inheritShell: true });
}
