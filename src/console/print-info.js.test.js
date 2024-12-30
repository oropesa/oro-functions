import { printInfo } from './print-info';

const mockProcessWrite = jest.fn();
const currentProcessWrite = process.stdout.write;

describe('fn: printInfo', () => {
  beforeEach(() => {
    process.stdout.write = mockProcessWrite;
    mockProcessWrite.mockReset();
  });

  afterEach(() => {
    process.stdout.write = currentProcessWrite;
  });

  test('fn: printInfo( str, wrong-options )', () => {
    const datetime = new Date().toISOString();

    const outputDatetime = new RegExp(`(.*)\\[${datetime.slice(0, 19)}.....\\] (.*)`);
    const outputLabel = '\u001B[96minfo \u001B[0m';
    const outputMessage = 'Importing ...';
    const outputSuffix = '\n';

    const output = new RegExp(`(.*)\\[${datetime.slice(0, 19)}.....\\] (.*)info (.*)Importing \\.\\.\\.`);

    expect(printInfo('Importing ...', { start: 7, end: 7, showDatetime: 7, showLabel: 7 })).toMatch(output);
    expect(mockProcessWrite).toHaveBeenNthCalledWith(1, expect.stringMatching(outputDatetime));
    expect(mockProcessWrite).toHaveBeenNthCalledWith(2, outputLabel);
    expect(mockProcessWrite).toHaveBeenNthCalledWith(3, outputMessage);
    expect(mockProcessWrite).toHaveBeenNthCalledWith(4, outputSuffix);
  });
});
