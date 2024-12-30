import { printText } from './print-text';

const mockProcessWrite = jest.fn();
const currentProcessWrite = process.stdout.write;

describe('fn: printText', () => {
  beforeEach(() => {
    process.stdout.write = mockProcessWrite;
    mockProcessWrite.mockReset();
  });

  afterEach(() => {
    process.stdout.write = currentProcessWrite;
  });

  test('fn: printText( str )', () => {
    const datetime = new Date().toISOString();

    const outputDatetime = new RegExp(`(.*)\\[${datetime.slice(0, 19)}.....\\] (.*)`);
    const outputMessage = 'Importing ...';
    const outputSuffix = '\n';

    const output = new RegExp(`(.*)\\[${datetime.slice(0, 19)}.....\\] (.*)Importing \\.\\.\\.`);

    expect(printText('Importing ...')).toMatch(output);
    expect(mockProcessWrite).toHaveBeenNthCalledWith(1, expect.stringMatching(outputDatetime));
    expect(mockProcessWrite).toHaveBeenNthCalledWith(2, outputMessage);
    expect(mockProcessWrite).toHaveBeenNthCalledWith(3, outputSuffix);
  });

  test('fn: printText( str, { start, end } )', () => {
    const datetime = new Date().toISOString();

    const outputPrefix = 'PREFIX ';
    const outputDatetime = new RegExp(`(.*)\\[${datetime.slice(0, 19)}.....\\] (.*)`);
    const outputMessage = 'Importing ...';
    const outputSuffix = ' SUFFIX';

    const output = new RegExp(`PREFIX (.*)\\[${datetime.slice(0, 19)}.....\\] (.*)Importing \\.\\.\\. SUFFIX`);

    expect(printText('Importing ...', { start: 'PREFIX ', end: ' SUFFIX' })).toMatch(output);
    expect(mockProcessWrite).toHaveBeenNthCalledWith(1, outputPrefix);
    expect(mockProcessWrite).toHaveBeenNthCalledWith(2, expect.stringMatching(outputDatetime));
    expect(mockProcessWrite).toHaveBeenNthCalledWith(3, outputMessage);
    expect(mockProcessWrite).toHaveBeenNthCalledWith(4, outputSuffix);
  });

  test('fn: printText( str, { no-datetime, no-end } )', () => {
    const outputMessage = 'Importing ...';

    expect(printText('Importing ...', { showDatetime: false, end: '' })).toBe(`${outputMessage}`);
    expect(mockProcessWrite).toHaveBeenNthCalledWith(1, outputMessage);
  });
});
