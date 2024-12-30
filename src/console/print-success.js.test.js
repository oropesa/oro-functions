import { printDone, printSuccess } from './print-success';

const mockProcessWrite = jest.fn();
const currentProcessWrite = process.stdout.write;

describe('fn: printSuccess', () => {
  beforeEach(() => {
    process.stdout.write = mockProcessWrite;
    mockProcessWrite.mockReset();
  });

  afterEach(() => {
    process.stdout.write = currentProcessWrite;
  });

  test('fn: printSuccess( str, wrong-options )', () => {
    const datetime = new Date().toISOString();

    const outputDatetime = new RegExp(`(.*)\\[${datetime.slice(0, 19)}.....\\] (.*)`);
    const outputLabel = '\u001B[92msuccess \u001B[0m';
    const outputMessage = 'CSV imported';
    const outputSuffix = '\n';

    const output = new RegExp(`(.*)\\[${datetime.slice(0, 19)}.....\\] (.*)success (.*)CSV imported`);

    expect(printSuccess('CSV imported', { start: 7, end: 7, showDatetime: 7, showLabel: 7 })).toMatch(output);
    expect(mockProcessWrite).toHaveBeenNthCalledWith(1, expect.stringMatching(outputDatetime));
    expect(mockProcessWrite).toHaveBeenNthCalledWith(2, outputLabel);
    expect(mockProcessWrite).toHaveBeenNthCalledWith(3, outputMessage);
    expect(mockProcessWrite).toHaveBeenNthCalledWith(4, outputSuffix);
  });

  test('fn: printDone( wrong-options )', () => {
    const outputMessage = '\u001B[92mDone\u001B[0m';
    const outputSuffix = '\n';

    expect(printDone(undefined, { start: 7, end: 7, showDatetime: 7, showLabel: 7 })).toBe(
      `${outputMessage}${outputSuffix}`,
    );
    expect(mockProcessWrite).toHaveBeenNthCalledWith(1, outputMessage);
    expect(mockProcessWrite).toHaveBeenNthCalledWith(2, outputSuffix);
  });
});
