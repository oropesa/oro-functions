import { processWrite, processWrites } from './process-write';

describe('fn: processWrite', () => {
  test('fn: processWrite( undefined )', () => {
    expect(processWrite(undefined)).toBe('undefined');
  });
});

describe('fn: processWrites', () => {
  test('fn: processWrites( undefined )', () => {
    expect(processWrites(undefined)).toBe('');
  });
});
