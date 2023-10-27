import { isObject, isArray, isString } from 'oro-functions-client';

export type ProcessWriteColor =
  | 'gray'
  | 'red'
  | 'green'
  | 'white'
  | 'yellow'
  | 'blue'
  | 'redlight'
  | 'bluelight';

export type ProcessWriteBackground = ProcessWriteColor;

export interface ProcessWriteObjectShort {
  s: string;
  c?: ProcessWriteColor;
  b?: ProcessWriteBackground;
}
export interface ProcessWriteObjectSimple {
  str: string;
  cl?: ProcessWriteColor;
  bg?: ProcessWriteBackground;
}
export interface ProcessWriteObjectVerbose {
  string: string;
  color?: ProcessWriteColor;
  background?: ProcessWriteBackground;
}

export type ProcessWriteObject =
  | ProcessWriteObjectShort
  | ProcessWriteObjectSimple
  | ProcessWriteObjectVerbose;

export function processWrite(
  string: string,
  color?: ProcessWriteColor,
  background?: ProcessWriteBackground,
): string;
export function processWrite(object: ProcessWriteObject): string;
export function processWrite(
  strOrObject: string | ProcessWriteObject,
  color?: ProcessWriteColor,
  bg?: ProcessWriteBackground,
) {
  const config: ProcessWriteObjectShort = { s: '', c: undefined, b: undefined };
  if (isObject(strOrObject)) {
    's' in strOrObject && (config.s = strOrObject.s);
    'str' in strOrObject && (config.s = strOrObject.str);
    'string' in strOrObject && (config.s = strOrObject.string);

    'c' in strOrObject && (config.c = strOrObject.c);
    'cl' in strOrObject && (config.c = strOrObject.cl);
    'color' in strOrObject && (config.c = strOrObject.color);

    'b' in strOrObject && (config.b = strOrObject.b);
    'bg' in strOrObject && (config.b = strOrObject.bg);
    'background' in strOrObject && (config.b = strOrObject.background);
  } else {
    config.s = String(strOrObject);
    config.c = color;
    config.b = bg;
  }

  if (config.c !== undefined && COLORS[config.c] !== undefined) {
    config.s = colorize(config.s, COLORS[config.c]);
  }

  if (config.b !== undefined && BGS[config.b] !== undefined) {
    config.s = colorize(config.s, BGS[config.b]);
  }

  process.stdout.write(config.s);
  return config.s;
}

export function processWrites(array: Array<string | ProcessWriteObject>) {
  if (!isArray(array)) {
    return '';
  }

  let string = '';
  for (const element of array) {
    string += isString(element) ? processWrite(element) : processWrite(element);
  }

  return string;
}

const COLORS: { [key in ProcessWriteColor]: number } = {
  gray: 90,
  red: 91,
  green: 92,
  white: 93,
  yellow: 93,
  blue: 94,
  redlight: 95,
  bluelight: 96,
};
const BGS: { [key in ProcessWriteColor]: number } = {
  gray: 100,
  red: 101,
  green: 102,
  white: 103,
  yellow: 103,
  blue: 104,
  redlight: 105,
  bluelight: 106,
};

function colorize(output: string, color: number) {
  return ['\u001B[', color, 'm', output, '\u001B[0m'].join('');
}
