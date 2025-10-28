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
    test('fn: processWrite( undefined )', () => {
      expect(processWrite(undefined)).toBe('undefined');
      expect(mockProcessWrite).toHaveBeenCalledWith('undefined');
    });

    test('fn: processWrite( short w/ wrong-attribute )', () => {
      const output = '\u001B[107m\u001B[92mchacho\u001B[0m';

      expect(processWrite({ s: 'chacho', c: 'green', b: 'graylight', a: ['random'] })).toBe(output);
      expect(mockProcessWrite).toHaveBeenCalledWith(output);
    });
  });

  describe('fn: processWrites', () => {
    test('fn: processWrites( undefined )', () => {
      expect(processWrites(undefined)).toBe('');
      expect(mockProcessWrite).not.toHaveBeenCalled();
    });
  });
});
