import { processWrite, processWrites } from './process-write';

const mockProcessWrite = jest.fn();
const currentProcessWrite = process.stdout.write;

describe('fn: processWrite & processWrites', () => {
  beforeEach(() => {
    process.stdout.write = mockProcessWrite;
    mockProcessWrite.mockReset();
  });

  afterEach(() => {
    process.stdout.write = currentProcessWrite;
  });

  describe('fn: processWrite', () => {
    test('fn: processWrite( str )', () => {
      const output = ' chacho\n';
      expect(processWrite(' chacho\n')).toBe(output);
      expect(mockProcessWrite).toHaveBeenCalledWith(output);
    });

    test('fn: processWrite( short )', () => {
      const output = '\u001B[3m\u001B[107m\u001B[92mchacho\u001B[0m';

      expect(processWrite({ s: 'chacho', c: 'green', b: 'graylight', a: ['italic'] })).toBe(output);
      expect(mockProcessWrite).toHaveBeenCalledWith(output);
    });

    test('fn: processWrite( simple )', () => {
      const output = '\u001B[3m\u001B[107m\u001B[92mchacho\u001B[0m';

      expect(processWrite({ str: 'chacho', cl: 'green', bg: 'graylight', at: ['italic'] })).toBe(output);
      expect(mockProcessWrite).toHaveBeenCalledWith(output);
    });

    test('fn: processWrite( verbose )', () => {
      const output = '\u001B[3m\u001B[107m\u001B[92mchacho\u001B[0m';

      expect(processWrite({ string: 'chacho', color: 'green', background: 'graylight', attributes: ['italic'] })).toBe(
        output,
      );
      expect(mockProcessWrite).toHaveBeenCalledWith(output);
    });
  });

  describe('fn: processWrites', () => {
    test('fn: processWrites( arr ) short', () => {
      const outputOne = '\u001B[1m\u001B[34mDone\u001B[0m';
      const outputTwo = ' Good bye ';
      const outputThree = '\u001B[40m\u001B[97m ¯\\_(ツ)_/¯ \u001B[0m';
      const outputFour = '\n';

      expect(
        processWrites([
          { s: 'Done', c: 'blue', a: ['bold'] },
          ' Good bye ',
          { s: String.raw` ¯\_(ツ)_/¯ `, c: 'graylight', b: 'black' },
          '\n',
        ]),
      ).toBe(`${outputOne}${outputTwo}${outputThree}${outputFour}`);

      expect(mockProcessWrite).toHaveBeenNthCalledWith(1, outputOne);
      expect(mockProcessWrite).toHaveBeenNthCalledWith(2, outputTwo);
      expect(mockProcessWrite).toHaveBeenNthCalledWith(3, outputThree);
      expect(mockProcessWrite).toHaveBeenNthCalledWith(4, outputFour);
    });
  });
});
