import { processWrite, processWrites } from './process-write';

describe('fn: processWrite', () => {
  test('fn: processWrite( str )', () => {
    expect(processWrite(' chacho\n')).toBe(' chacho\n');
  });

  test('fn: processWrite( str, color gray )', () => {
    expect(processWrite('chacho', 'gray')).toBe('\u001B[90mchacho\u001B[0m');
  });

  test('fn: processWrite( str, color red )', () => {
    expect(processWrite('chacho', 'red')).toBe('\u001B[91mchacho\u001B[0m');
  });

  test('fn: processWrite( str, color green )', () => {
    expect(processWrite('chacho', 'green')).toBe('\u001B[92mchacho\u001B[0m');
  });

  test('fn: processWrite( str, color white )', () => {
    expect(processWrite('chacho', 'white')).toBe('\u001B[93mchacho\u001B[0m');
  });

  test('fn: processWrite( str, color blue )', () => {
    expect(processWrite('chacho', 'blue')).toBe('\u001B[94mchacho\u001B[0m');
  });

  test('fn: processWrite( str, color redlight )', () => {
    expect(processWrite('chacho', 'redlight')).toBe('\u001B[95mchacho\u001B[0m');
  });

  test('fn: processWrite( str, color bluelight )', () => {
    expect(processWrite('chacho', 'bluelight')).toBe('\u001B[96mchacho\u001B[0m');
    processWrite('\n');
  });

  test('fn: processWrite( str, null, bg gray )', () => {
    expect(processWrite('chacho', undefined, 'gray')).toBe('\u001B[100mchacho\u001B[0m');
  });

  test('fn: processWrite( str, null, bg red )', () => {
    expect(processWrite('chacho', undefined, 'red')).toBe('\u001B[101mchacho\u001B[0m');
  });

  test('fn: processWrite( str, null, bg green )', () => {
    expect(processWrite('chacho', undefined, 'green')).toBe('\u001B[102mchacho\u001B[0m');
  });

  test('fn: processWrite( str, null, bg white )', () => {
    expect(processWrite('chacho', undefined, 'white')).toBe('\u001B[103mchacho\u001B[0m');
  });

  test('fn: processWrite( str, null, bg blue )', () => {
    expect(processWrite('chacho', undefined, 'blue')).toBe('\u001B[104mchacho\u001B[0m');
  });

  test('fn: processWrite( str, null, bg redlight )', () => {
    expect(processWrite('chacho', undefined, 'redlight')).toBe('\u001B[105mchacho\u001B[0m');
  });

  test('fn: processWrite( str, null, bg bluelight )', () => {
    expect(processWrite('chacho', undefined, 'bluelight')).toBe('\u001B[106mchacho\u001B[0m');
    processWrite('\n');
  });

  test('fn: processWrite( str, color red, bg redlight )', () => {
    // eslint-disable-next-line unicorn/prefer-string-raw
    expect(processWrite(' ¯\\_(ツ)_/¯ ', 'red', 'redlight')).toBe(
      '\u001B[105m\u001B[91m ¯\\_(ツ)_/¯ \u001B[0m\u001B[0m',
    );
    processWrite('\n');
  });
});

describe('fn: processWrites', () => {
  test('fn: processWrites( arr ) short', () => {
    expect(processWrites([{ s: 'end', c: 'blue' }, ' Good bye ', { s: '=)', c: 'blue', b: 'bluelight' }, '\n'])).toBe(
      '\u001B[94mend\u001B[0m Good bye \u001B[106m\u001B[94m=)\u001B[0m\u001B[0m\n',
    );
  });

  test('fn: processWrites( arr ) simple', () => {
    expect(
      processWrites([{ str: 'end', cl: 'blue' }, ' Good bye ', { str: '=)', cl: 'blue', bg: 'bluelight' }, '\n']),
    ).toBe('\u001B[94mend\u001B[0m Good bye \u001B[106m\u001B[94m=)\u001B[0m\u001B[0m\n');
  });

  test('fn: processWrites( arr ) verbose', () => {
    expect(
      processWrites([
        { string: 'end', color: 'blue' },
        ' Good bye ',
        { string: '=)', color: 'blue', background: 'bluelight' },
        '\n',
      ]),
    ).toBe('\u001B[94mend\u001B[0m Good bye \u001B[106m\u001B[94m=)\u001B[0m\u001B[0m\n');
  });
});
