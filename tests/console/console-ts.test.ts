import { Ofn } from '../../dist';

describe('fn: processWrite', () => {
  // test('fn: processWrite( undefined )', () => {
  //   expect(Ofn.processWrite(undefined)).toBe('undefined');
  // });
  test('fn: processWrite( str )', () => {
    expect(Ofn.processWrite(' chacho\n')).toBe(' chacho\n');
  });

  test('fn: processWrite( str, color gray )', () => {
    expect(Ofn.processWrite('chacho', 'gray')).toBe('\u001B[90mchacho\u001B[0m');
  });
  test('fn: processWrite( str, color red )', () => {
    expect(Ofn.processWrite('chacho', 'red')).toBe('\u001B[91mchacho\u001B[0m');
  });
  test('fn: processWrite( str, color green )', () => {
    expect(Ofn.processWrite('chacho', 'green')).toBe('\u001B[92mchacho\u001B[0m');
  });
  test('fn: processWrite( str, color white )', () => {
    expect(Ofn.processWrite('chacho', 'white')).toBe('\u001B[93mchacho\u001B[0m');
  });
  test('fn: processWrite( str, color blue )', () => {
    expect(Ofn.processWrite('chacho', 'blue')).toBe('\u001B[94mchacho\u001B[0m');
  });
  test('fn: processWrite( str, color redlight )', () => {
    expect(Ofn.processWrite('chacho', 'redlight')).toBe('\u001B[95mchacho\u001B[0m');
  });
  test('fn: processWrite( str, color bluelight )', () => {
    expect(Ofn.processWrite('chacho', 'bluelight')).toBe('\u001B[96mchacho\u001B[0m');
    Ofn.processWrite('\n');
  });

  test('fn: processWrite( str, null, bg gray )', () => {
    expect(Ofn.processWrite('chacho', undefined, 'gray')).toBe('\u001B[100mchacho\u001B[0m');
  });
  test('fn: processWrite( str, null, bg red )', () => {
    expect(Ofn.processWrite('chacho', undefined, 'red')).toBe('\u001B[101mchacho\u001B[0m');
  });
  test('fn: processWrite( str, null, bg green )', () => {
    expect(Ofn.processWrite('chacho', undefined, 'green')).toBe('\u001B[102mchacho\u001B[0m');
  });
  test('fn: processWrite( str, null, bg white )', () => {
    expect(Ofn.processWrite('chacho', undefined, 'white')).toBe('\u001B[103mchacho\u001B[0m');
  });
  test('fn: processWrite( str, null, bg blue )', () => {
    expect(Ofn.processWrite('chacho', undefined, 'blue')).toBe('\u001B[104mchacho\u001B[0m');
  });
  test('fn: processWrite( str, null, bg redlight )', () => {
    expect(Ofn.processWrite('chacho', undefined, 'redlight')).toBe('\u001B[105mchacho\u001B[0m');
  });
  test('fn: processWrite( str, null, bg bluelight )', () => {
    expect(Ofn.processWrite('chacho', undefined, 'bluelight')).toBe('\u001B[106mchacho\u001B[0m');
    Ofn.processWrite('\n');
  });

  test('fn: processWrite( str, color red, bg redlight )', () => {
    expect(Ofn.processWrite(' ¯\\_(ツ)_/¯ ', 'red', 'redlight')).toBe(
      '\u001B[105m\u001B[91m ¯\\_(ツ)_/¯ \u001B[0m\u001B[0m',
    );
    Ofn.processWrite('\n');
  });
});

describe('fn: processWrites', () => {
  // test('fn: processWrites( undefined )', () => {
  //   expect(Ofn.processWrites(undefined)).toBe('');
  // });
  test('fn: processWrites( arr )', () => {
    expect(
      Ofn.processWrites([
        { s: 'end', c: 'blue' },
        ' Good bye ',
        { s: '=)', c: 'blue', b: 'bluelight' },
        '\n',
      ]),
    ).toBe('\u001B[94mend\u001B[0m Good bye \u001B[106m\u001B[94m=)\u001B[0m\u001B[0m\n');
  });
});
