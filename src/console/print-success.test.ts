import { printDone, printSuccess } from './print-success';

const mockProcessWrite = jest.fn();
const currentProcessWrite = process.stdout.write;

describe('fn: printSuccess & printDone', () => {
  beforeEach(() => {
    process.stdout.write = mockProcessWrite;
    mockProcessWrite.mockReset();
  });

  afterEach(() => {
    process.stdout.write = currentProcessWrite;
  });

  describe('fn: printSuccess', () => {
    test('fn: printSuccess( str )', () => {
      const datetime = new Date().toISOString();

      const outputDatetime = new RegExp(`(.*)\\[${datetime.slice(0, 19)}.....\\] (.*)`);
      const outputLabel = '\u001B[92msuccess \u001B[0m';
      const outputMessage = 'CSV imported';
      const outputSuffix = '\n';

      const output = new RegExp(`(.*)\\[${datetime.slice(0, 19)}.....\\] (.*)success (.*)CSV imported`);

      expect(printSuccess('CSV imported')).toMatch(output);
      expect(mockProcessWrite).toHaveBeenNthCalledWith(1, expect.stringMatching(outputDatetime));
      expect(mockProcessWrite).toHaveBeenNthCalledWith(2, outputLabel);
      expect(mockProcessWrite).toHaveBeenNthCalledWith(3, outputMessage);
      expect(mockProcessWrite).toHaveBeenNthCalledWith(4, outputSuffix);
    });

    test('fn: printSuccess( str, { start, end } )', () => {
      const datetime = new Date().toISOString();

      const outputPrefix = 'PREFIX ';
      const outputDatetime = new RegExp(`(.*)\\[${datetime.slice(0, 19)}.....\\] (.*)`);
      const outputLabel = '\u001B[92msuccess \u001B[0m';
      const outputMessage = 'CSV imported';
      const outputSuffix = ' SUFFIX';

      const output = new RegExp(`PREFIX (.*)\\[${datetime.slice(0, 19)}.....\\] (.*)success (.*)CSV imported SUFFIX`);

      expect(printSuccess('CSV imported', { start: 'PREFIX ', end: ' SUFFIX' })).toMatch(output);
      expect(mockProcessWrite).toHaveBeenNthCalledWith(1, outputPrefix);
      expect(mockProcessWrite).toHaveBeenNthCalledWith(2, expect.stringMatching(outputDatetime));
      expect(mockProcessWrite).toHaveBeenNthCalledWith(3, outputLabel);
      expect(mockProcessWrite).toHaveBeenNthCalledWith(4, outputMessage);
      expect(mockProcessWrite).toHaveBeenNthCalledWith(5, outputSuffix);
    });

    test('fn: printSuccess( str, { no-datetime, no-label, no-end } )', () => {
      const outputMessage = '\u001B[92mCSV imported\u001B[0m';

      expect(printSuccess('CSV imported', { showDatetime: false, showLabel: false, end: '' })).toBe(`${outputMessage}`);
      expect(mockProcessWrite).toHaveBeenNthCalledWith(1, outputMessage);
    });
  });

  describe('fn: printDone', () => {
    test('fn: printDone()', () => {
      const outputMessage = '\u001B[92mDone\u001B[0m';
      const outputSuffix = '\n';

      expect(printDone()).toBe(`${outputMessage}${outputSuffix}`);
      expect(mockProcessWrite).toHaveBeenNthCalledWith(1, outputMessage);
      expect(mockProcessWrite).toHaveBeenNthCalledWith(2, outputSuffix);
    });

    test('fn: printDone( str )', () => {
      const outputMessage = '\u001B[92mIgnored\u001B[0m';
      const outputSuffix = '\n';

      expect(printDone('Ignored')).toBe(`${outputMessage}${outputSuffix}`);
      expect(mockProcessWrite).toHaveBeenNthCalledWith(1, outputMessage);
      expect(mockProcessWrite).toHaveBeenNthCalledWith(2, outputSuffix);
    });

    test('fn: printDone( str, { start, end } )', () => {
      const outputPrefix = 'PREFIX ';
      const outputMessage = '\u001B[92mSuccess\u001B[0m';
      const outputSuffix = ' SUFFIX';

      expect(printDone('Success', { start: 'PREFIX ', end: ' SUFFIX' })).toBe(
        `${outputPrefix}${outputMessage}${outputSuffix}`,
      );
      expect(mockProcessWrite).toHaveBeenNthCalledWith(1, outputPrefix);
      expect(mockProcessWrite).toHaveBeenNthCalledWith(2, outputMessage);
      expect(mockProcessWrite).toHaveBeenNthCalledWith(3, outputSuffix);
    });

    test('fn: printDone( str, { with-datetime, with-label } )', () => {
      const datetime = new Date().toISOString();

      const outputDatetime = new RegExp(`(.*)\\[${datetime.slice(0, 19)}.....\\] (.*)`);
      const outputLabel = '\u001B[92msuccess \u001B[0m';
      const outputMessage = 'CSV imported';
      const outputSuffix = '\n';

      const output = new RegExp(`(.*)\\[${datetime.slice(0, 19)}.....\\] (.*)success (.*)CSV imported`);

      expect(printDone('CSV imported', { showDatetime: true, showLabel: true })).toMatch(output);
      expect(mockProcessWrite).toHaveBeenNthCalledWith(1, expect.stringMatching(outputDatetime));
      expect(mockProcessWrite).toHaveBeenNthCalledWith(2, outputLabel);
      expect(mockProcessWrite).toHaveBeenNthCalledWith(3, outputMessage);
      expect(mockProcessWrite).toHaveBeenNthCalledWith(4, outputSuffix);
    });
  });
});
