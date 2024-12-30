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

  test('fn: printText( str, wrong-options )', () => {
    const datetime = new Date().toISOString();

    const outputDatetime = new RegExp(`(.*)\\[${datetime.slice(0, 19)}.....\\] (.*)`);
    const outputMessage = 'Importing ...';
    const outputSuffix = '\n';

    const output = new RegExp(`(.*)\\[${datetime.slice(0, 19)}.....\\] (.*)Importing \\.\\.\\.`);

    expect(printText('Importing ...', { start: 7, end: 7, showDatetime: 7 })).toMatch(output);
    expect(mockProcessWrite).toHaveBeenNthCalledWith(1, expect.stringMatching(outputDatetime));
    expect(mockProcessWrite).toHaveBeenNthCalledWith(2, outputMessage);
    expect(mockProcessWrite).toHaveBeenNthCalledWith(3, outputSuffix);
  });
});
