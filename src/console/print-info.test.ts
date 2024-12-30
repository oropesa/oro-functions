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

  test('fn: printInfo( str )', () => {
    const datetime = new Date().toISOString();

    const outputDatetime = new RegExp(`(.*)\\[${datetime.slice(0, 19)}.....\\] (.*)`);
    const outputLabel = '\u001B[96minfo \u001B[0m';
    const outputMessage = 'Importing ...';
    const outputSuffix = '\n';

    const output = new RegExp(`(.*)\\[${datetime.slice(0, 19)}.....\\] (.*)info (.*)Importing \\.\\.\\.`);

    expect(printInfo('Importing ...')).toMatch(output);
    expect(mockProcessWrite).toHaveBeenNthCalledWith(1, expect.stringMatching(outputDatetime));
    expect(mockProcessWrite).toHaveBeenNthCalledWith(2, outputLabel);
    expect(mockProcessWrite).toHaveBeenNthCalledWith(3, outputMessage);
    expect(mockProcessWrite).toHaveBeenNthCalledWith(4, outputSuffix);
  });

  test('fn: printInfo( str, { start, end } )', () => {
    const datetime = new Date().toISOString();

    const outputPrefix = 'PREFIX ';
    const outputDatetime = new RegExp(`(.*)\\[${datetime.slice(0, 19)}.....\\] (.*)`);
    const outputLabel = '\u001B[96minfo \u001B[0m';
    const outputMessage = 'Importing ...';
    const outputSuffix = ' SUFFIX';

    const output = new RegExp(`PREFIX (.*)\\[${datetime.slice(0, 19)}.....\\] (.*)info (.*)Importing \\.\\.\\. SUFFIX`);

    expect(printInfo('Importing ...', { start: 'PREFIX ', end: ' SUFFIX' })).toMatch(output);
    expect(mockProcessWrite).toHaveBeenNthCalledWith(1, outputPrefix);
    expect(mockProcessWrite).toHaveBeenNthCalledWith(2, expect.stringMatching(outputDatetime));
    expect(mockProcessWrite).toHaveBeenNthCalledWith(3, outputLabel);
    expect(mockProcessWrite).toHaveBeenNthCalledWith(4, outputMessage);
    expect(mockProcessWrite).toHaveBeenNthCalledWith(5, outputSuffix);
  });

  test('fn: printInfo( str, { no-datetime, no-label, no-end } )', () => {
    const outputMessage = '\u001B[96mImporting ...\u001B[0m';

    expect(printInfo('Importing ...', { showDatetime: false, showLabel: false, end: '' })).toBe(`${outputMessage}`);
    expect(mockProcessWrite).toHaveBeenNthCalledWith(1, outputMessage);
  });
});
