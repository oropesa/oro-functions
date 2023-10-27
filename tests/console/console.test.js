const { Ofn } = require('../../dist');

describe('fn: processWrite', () => {
  test('fn: processWrite( undefined )', () => {
    expect(Ofn.processWrite()).toBe('undefined');
  });
  test('fn: processWrite( str )', () => {
    expect(Ofn.processWrite(' chacho\n')).toBe(' chacho\n');
  });

  test('fn: processWrite( str, color gray )', () => {
    expect(Ofn.processWrite('chacho', 'gray')).toBe('\x1b[90mchacho\x1b[0m');
  });
  test('fn: processWrite( str, color red )', () => {
    expect(Ofn.processWrite('chacho', 'red')).toBe('\x1b[91mchacho\x1b[0m');
  });
  test('fn: processWrite( str, color green )', () => {
    expect(Ofn.processWrite('chacho', 'green')).toBe('\x1b[92mchacho\x1b[0m');
  });
  test('fn: processWrite( str, color white )', () => {
    expect(Ofn.processWrite('chacho', 'white')).toBe('\x1b[93mchacho\x1b[0m');
  });
  test('fn: processWrite( str, color blue )', () => {
    expect(Ofn.processWrite('chacho', 'blue')).toBe('\x1b[94mchacho\x1b[0m');
  });
  test('fn: processWrite( str, color redlight )', () => {
    expect(Ofn.processWrite('chacho', 'redlight')).toBe('\x1b[95mchacho\x1b[0m');
  });
  test('fn: processWrite( str, color bluelight )', () => {
    expect(Ofn.processWrite('chacho', 'bluelight')).toBe('\x1b[96mchacho\x1b[0m');
    Ofn.processWrite('\n');
  });

  test('fn: processWrite( str, null, bg gray )', () => {
    expect(Ofn.processWrite('chacho', null, 'gray')).toBe('\x1b[100mchacho\x1b[0m');
  });
  test('fn: processWrite( str, null, bg red )', () => {
    expect(Ofn.processWrite('chacho', null, 'red')).toBe('\x1b[101mchacho\x1b[0m');
  });
  test('fn: processWrite( str, null, bg green )', () => {
    expect(Ofn.processWrite('chacho', null, 'green')).toBe('\x1b[102mchacho\x1b[0m');
  });
  test('fn: processWrite( str, null, bg white )', () => {
    expect(Ofn.processWrite('chacho', null, 'white')).toBe('\x1b[103mchacho\x1b[0m');
  });
  test('fn: processWrite( str, null, bg blue )', () => {
    expect(Ofn.processWrite('chacho', null, 'blue')).toBe('\x1b[104mchacho\x1b[0m');
  });
  test('fn: processWrite( str, null, bg redlight )', () => {
    expect(Ofn.processWrite('chacho', null, 'redlight')).toBe('\x1b[105mchacho\x1b[0m');
  });
  test('fn: processWrite( str, null, bg bluelight )', () => {
    expect(Ofn.processWrite('chacho', null, 'bluelight')).toBe('\x1b[106mchacho\x1b[0m');
    Ofn.processWrite('\n');
  });

  test('fn: processWrite( str, color red, bg redlight )', () => {
    expect(Ofn.processWrite(' ¯\\_(ツ)_/¯ ', 'red', 'redlight')).toBe(
      '\x1b[105m\x1b[91m ¯\\_(ツ)_/¯ \x1b[0m\x1b[0m',
    );
    Ofn.processWrite('\n');
  });
});

describe('fn: processWrites', () => {
  test('fn: processWrites( undefined )', () => {
    expect(Ofn.processWrites()).toBe('');
  });
  test('fn: processWrites( arr )', () => {
    expect(
      Ofn.processWrites([
        { s: 'end', c: 'blue' },
        ' Good bye ',
        { s: '=)', c: 'blue', b: 'bluelight' },
        '\n',
      ]),
    ).toBe('\x1b[94mend\x1b[0m Good bye \x1b[106m\x1b[94m=)\x1b[0m\x1b[0m\n');
  });
});
