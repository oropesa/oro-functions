import { printError } from './print-error';

const mockProcessWrite = jest.fn();
const currentProcessWrite = process.stdout.write;

describe('fn: printError', () => {
  beforeEach(() => {
    process.stdout.write = mockProcessWrite;
    mockProcessWrite.mockReset();
  });

  afterEach(() => {
    process.stdout.write = currentProcessWrite;
  });

  test('fn: printError( str )', () => {
    const datetime = new Date().toISOString();

    const outputDatetime = new RegExp(`(.*)\\[${datetime.slice(0, 19)}.....\\] (.*)`);
    const outputLabel = '\u001B[91merror \u001B[0m';
    const outputMessage = 'An error happened ...';
    const outputSuffix = '\n';

    const output = new RegExp(`(.*)\\[${datetime.slice(0, 19)}.....\\] (.*)error (.*)An error happened \\.\\.\\.`);

    expect(printError('An error happened ...')).toMatch(output);
    expect(mockProcessWrite).toHaveBeenNthCalledWith(1, expect.stringMatching(outputDatetime));
    expect(mockProcessWrite).toHaveBeenNthCalledWith(2, outputLabel);
    expect(mockProcessWrite).toHaveBeenNthCalledWith(3, outputMessage);
    expect(mockProcessWrite).toHaveBeenNthCalledWith(4, outputSuffix);
  });

  test('fn: printError( str, { start, end } )', () => {
    const datetime = new Date().toISOString();

    const outputPrefix = 'PREFIX ';
    const outputDatetime = new RegExp(`(.*)\\[${datetime.slice(0, 19)}.....\\] (.*)`);
    const outputLabel = '\u001B[91merror \u001B[0m';
    const outputMessage = 'An error happened ...';
    const outputSuffix = ' SUFFIX';

    const output = new RegExp(
      `PREFIX (.*)\\[${datetime.slice(0, 19)}.....\\] (.*)error (.*)An error happened \\.\\.\\. SUFFIX`,
    );

    expect(printError('An error happened ...', { start: 'PREFIX ', end: ' SUFFIX' })).toMatch(output);
    expect(mockProcessWrite).toHaveBeenNthCalledWith(1, outputPrefix);
    expect(mockProcessWrite).toHaveBeenNthCalledWith(2, expect.stringMatching(outputDatetime));
    expect(mockProcessWrite).toHaveBeenNthCalledWith(3, outputLabel);
    expect(mockProcessWrite).toHaveBeenNthCalledWith(4, outputMessage);
    expect(mockProcessWrite).toHaveBeenNthCalledWith(5, outputSuffix);
  });

  test('fn: printError( str, { no-datetime, no-label, no-end } )', () => {
    const outputMessage = '\u001B[91mAn error happened ...\u001B[0m';

    expect(printError('An error happened ...', { showDatetime: false, showLabel: false, end: '' })).toBe(
      `${outputMessage}`,
    );
    expect(mockProcessWrite).toHaveBeenNthCalledWith(1, outputMessage);
  });
});
