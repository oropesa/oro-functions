import { printWarn } from './print-warn';

const mockProcessWrite = jest.fn();
const currentProcessWrite = process.stdout.write;

describe('fn: printWarn', () => {
  beforeEach(() => {
    process.stdout.write = mockProcessWrite;
    mockProcessWrite.mockReset();
  });

  afterEach(() => {
    process.stdout.write = currentProcessWrite;
  });

  test('fn: printWarn( str )', () => {
    const datetime = new Date().toISOString();

    const outputDatetime = new RegExp(`(.*)\\[${datetime.slice(0, 19)}.....\\] (.*)`);
    const outputLabel = '\u001B[93mwarn \u001B[0m';
    const outputMessage = 'Ignored';
    const outputSuffix = '\n';

    const output = new RegExp(`(.*)\\[${datetime.slice(0, 19)}.....\\] (.*)warn (.*)Ignored`);

    expect(printWarn('Ignored')).toMatch(output);
    expect(mockProcessWrite).toHaveBeenNthCalledWith(1, expect.stringMatching(outputDatetime));
    expect(mockProcessWrite).toHaveBeenNthCalledWith(2, outputLabel);
    expect(mockProcessWrite).toHaveBeenNthCalledWith(3, outputMessage);
    expect(mockProcessWrite).toHaveBeenNthCalledWith(4, outputSuffix);
  });

  test('fn: printWarn( str, { start, end } )', () => {
    const datetime = new Date().toISOString();

    const outputPrefix = 'PREFIX ';
    const outputDatetime = new RegExp(`(.*)\\[${datetime.slice(0, 19)}.....\\] (.*)`);
    const outputLabel = '\u001B[93mwarn \u001B[0m';
    const outputMessage = 'Ignored';
    const outputSuffix = ' SUFFIX';

    const output = new RegExp(`PREFIX (.*)\\[${datetime.slice(0, 19)}.....\\] (.*)warn (.*)Ignored SUFFIX`);

    expect(printWarn('Ignored', { start: 'PREFIX ', end: ' SUFFIX' })).toMatch(output);
    expect(mockProcessWrite).toHaveBeenNthCalledWith(1, outputPrefix);
    expect(mockProcessWrite).toHaveBeenNthCalledWith(2, expect.stringMatching(outputDatetime));
    expect(mockProcessWrite).toHaveBeenNthCalledWith(3, outputLabel);
    expect(mockProcessWrite).toHaveBeenNthCalledWith(4, outputMessage);
    expect(mockProcessWrite).toHaveBeenNthCalledWith(5, outputSuffix);
  });

  test('fn: printWarn( str, { no-datetime, no-label, no-end } )', () => {
    const outputMessage = '\u001B[93mIgnored\u001B[0m';

    expect(printWarn('Ignored', { showDatetime: false, showLabel: false, end: '' })).toBe(`${outputMessage}`);
    expect(mockProcessWrite).toHaveBeenNthCalledWith(1, outputMessage);
  });
});
