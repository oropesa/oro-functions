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

    test('fn: processWrite( str, color gray )', () => {
      const output = '\u001B[90mchacho\u001B[0m';
      expect(processWrite('chacho', 'gray')).toBe(output);
      expect(mockProcessWrite).toHaveBeenCalledWith(output);
    });

    test('fn: processWrite( str, color red )', () => {
      const output = '\u001B[91mchacho\u001B[0m';
      expect(processWrite('chacho', 'red')).toBe(output);
      expect(mockProcessWrite).toHaveBeenCalledWith(output);
    });

    test('fn: processWrite( str, color green )', () => {
      const output = '\u001B[92mchacho\u001B[0m';
      expect(processWrite('chacho', 'green')).toBe(output);
      expect(mockProcessWrite).toHaveBeenCalledWith(output);
    });

    test('fn: processWrite( str, color white )', () => {
      const output = '\u001B[93mchacho\u001B[0m';
      expect(processWrite('chacho', 'white')).toBe(output);
      expect(mockProcessWrite).toHaveBeenCalledWith(output);
    });

    test('fn: processWrite( str, color blue )', () => {
      const output = '\u001B[94mchacho\u001B[0m';
      expect(processWrite('chacho', 'blue')).toBe(output);
      expect(mockProcessWrite).toHaveBeenCalledWith(output);
    });

    test('fn: processWrite( str, color redlight )', () => {
      const output = '\u001B[95mchacho\u001B[0m';
      expect(processWrite('chacho', 'redlight')).toBe(output);
      expect(mockProcessWrite).toHaveBeenCalledWith(output);
    });

    test('fn: processWrite( str, color bluelight )', () => {
      const output = '\u001B[96mchacho\u001B[0m';
      expect(processWrite('chacho', 'bluelight')).toBe(output);
      expect(mockProcessWrite).toHaveBeenCalledWith(output);
    });

    test('fn: processWrite( str, null, bg gray )', () => {
      const output = '\u001B[100mchacho\u001B[0m';
      expect(processWrite('chacho', undefined, 'gray')).toBe(output);
      expect(mockProcessWrite).toHaveBeenCalledWith(output);
    });

    test('fn: processWrite( str, null, bg red )', () => {
      const output = '\u001B[101mchacho\u001B[0m';
      expect(processWrite('chacho', undefined, 'red')).toBe(output);
      expect(mockProcessWrite).toHaveBeenCalledWith(output);
    });

    test('fn: processWrite( str, null, bg green )', () => {
      const output = '\u001B[102mchacho\u001B[0m';
      expect(processWrite('chacho', undefined, 'green')).toBe(output);
      expect(mockProcessWrite).toHaveBeenCalledWith(output);
    });

    test('fn: processWrite( str, null, bg white )', () => {
      const output = '\u001B[103mchacho\u001B[0m';
      expect(processWrite('chacho', undefined, 'white')).toBe(output);
      expect(mockProcessWrite).toHaveBeenCalledWith(output);
    });

    test('fn: processWrite( str, null, bg blue )', () => {
      const output = '\u001B[104mchacho\u001B[0m';
      expect(processWrite('chacho', undefined, 'blue')).toBe(output);
      expect(mockProcessWrite).toHaveBeenCalledWith(output);
    });

    test('fn: processWrite( str, null, bg redlight )', () => {
      const output = '\u001B[105mchacho\u001B[0m';
      expect(processWrite('chacho', undefined, 'redlight')).toBe(output);
      expect(mockProcessWrite).toHaveBeenCalledWith(output);
    });

    test('fn: processWrite( str, null, bg bluelight )', () => {
      const output = '\u001B[106mchacho\u001B[0m';
      expect(processWrite('chacho', undefined, 'bluelight')).toBe(output);
      expect(mockProcessWrite).toHaveBeenCalledWith(output);
    });

    test('fn: processWrite( str, color red, bg redlight )', () => {
      const output = '\u001B[105m\u001B[91m ¯\\_(ツ)_/¯ \u001B[0m\u001B[0m';
      // eslint-disable-next-line unicorn/prefer-string-raw
      expect(processWrite(' ¯\\_(ツ)_/¯ ', 'red', 'redlight')).toBe(output);
      expect(mockProcessWrite).toHaveBeenCalledWith(output);
    });
  });

  describe('fn: processWrites', () => {
    test('fn: processWrites( arr ) short', () => {
      const outputOne = '\u001B[94mend\u001B[0m';
      const outputTwo = ' Good bye ';
      const outputThree = '\u001B[106m\u001B[94m=)\u001B[0m\u001B[0m';
      const outputFour = '\n';
      expect(processWrites([{ s: 'end', c: 'blue' }, ' Good bye ', { s: '=)', c: 'blue', b: 'bluelight' }, '\n'])).toBe(
        `${outputOne}${outputTwo}${outputThree}${outputFour}`,
      );
      expect(mockProcessWrite).toHaveBeenNthCalledWith(1, outputOne);
      expect(mockProcessWrite).toHaveBeenNthCalledWith(2, outputTwo);
      expect(mockProcessWrite).toHaveBeenNthCalledWith(3, outputThree);
      expect(mockProcessWrite).toHaveBeenNthCalledWith(4, outputFour);
    });

    test('fn: processWrites( arr ) simple', () => {
      const outputOne = '\u001B[94mend\u001B[0m';
      const outputTwo = ' Good bye ';
      const outputThree = '\u001B[106m\u001B[94m=)\u001B[0m\u001B[0m';
      const outputFour = '\n';
      expect(
        processWrites([{ str: 'end', cl: 'blue' }, ' Good bye ', { str: '=)', cl: 'blue', bg: 'bluelight' }, '\n']),
      ).toBe(`${outputOne}${outputTwo}${outputThree}${outputFour}`);
      expect(mockProcessWrite).toHaveBeenNthCalledWith(1, outputOne);
      expect(mockProcessWrite).toHaveBeenNthCalledWith(2, outputTwo);
      expect(mockProcessWrite).toHaveBeenNthCalledWith(3, outputThree);
      expect(mockProcessWrite).toHaveBeenNthCalledWith(4, outputFour);
    });

    test('fn: processWrites( arr ) verbose', () => {
      const outputOne = '\u001B[94mend\u001B[0m';
      const outputTwo = ' Good bye ';
      const outputThree = '\u001B[106m\u001B[94m=)\u001B[0m\u001B[0m';
      const outputFour = '\n';
      expect(
        processWrites([
          { string: 'end', color: 'blue' },
          ' Good bye ',
          { string: '=)', color: 'blue', background: 'bluelight' },
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
