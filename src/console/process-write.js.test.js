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
  });

  describe('fn: processWrites', () => {
    test('fn: processWrites( undefined )', () => {
      expect(processWrites(undefined)).toBe('');
      expect(mockProcessWrite).not.toHaveBeenCalled();
    });
  });
});
