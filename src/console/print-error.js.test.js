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

  test('fn: printError( str, wrong-options )', () => {
    const datetime = new Date().toISOString();

    const outputDatetime = new RegExp(`(.*)\\[${datetime.slice(0, 19)}.....\\] (.*)`);
    const outputLabel = '\u001B[91merror \u001B[0m';
    const outputMessage = 'An error happened ...';
    const outputSuffix = '\n';

    const output = new RegExp(`(.*)\\[${datetime.slice(0, 19)}.....\\] (.*)error (.*)An error happened \\.\\.\\.`);

    expect(printError('An error happened ...', { start: 7, end: 7, showDatetime: 7, showLabel: 7 })).toMatch(output);
    expect(mockProcessWrite).toHaveBeenNthCalledWith(1, expect.stringMatching(outputDatetime));
    expect(mockProcessWrite).toHaveBeenNthCalledWith(2, outputLabel);
    expect(mockProcessWrite).toHaveBeenNthCalledWith(3, outputMessage);
    expect(mockProcessWrite).toHaveBeenNthCalledWith(4, outputSuffix);
  });
});
