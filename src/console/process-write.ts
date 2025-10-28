import { isArray, isObject, isString } from 'oro-functions-client';

const COLORS = {
  black: 30,
  blueflat: 94,
  blue: 34,
  cyanflat: 36,
  cyan: 96,
  gray: 90,
  grayflat: 37,
  graylight: 97,
  green: 92,
  greenflat: 32,
  red: 91,
  redflat: 31,
  purple: 95,
  purpleflat: 35,
  yellow: 93,
  yellowflat: 33,

  /**
   * @deprecated use `yellow` instead
   */
  white: 93,
  /**
   * @deprecated use `purple` instead
   */
  redlight: 95,
  /**
   * @deprecated use `cyan` instead
   */
  bluelight: 96,
} as const;

const BGS = {
  black: 40,
  blueflat: 104,
  blue: 44,
  cyanflat: 46,
  cyan: 106,
  gray: 100,
  grayflat: 47,
  graylight: 107,
  green: 102,
  greenflat: 42,
  inverse: 7,
  red: 101,
  redflat: 41,
  purple: 105,
  purpleflat: 45,
  yellow: 103,
  yellowflat: 43,

  /**
   * @deprecated use `yellow` instead
   */
  white: 103,
  /**
   * @deprecated use `purple` instead
   */
  redlight: 105,
  /**
   * @deprecated use `cyan` instead
   */
  bluelight: 106,
} as const;

const ATTRIBUTES = {
  bold: 1,
  crossedout: 9,
  italic: 3,
  underline: 4,
  underlinedouble: 21,
} as const;

//

/**
 * @deprecated use `yellow` instead
 */
type DeprecatedColorWhite = 'white';
/**
 * @deprecated use `purple` instead
 */
type DeprecatedColorRedLight = 'redlight';
/**
 * @deprecated use `cyan` instead
 */
type DeprecatedColorBlueLight = 'bluelight';

type DeprecatedColors = DeprecatedColorWhite | DeprecatedColorRedLight | DeprecatedColorBlueLight;

//

export type ProcessWriteColor = keyof typeof COLORS | DeprecatedColors;

export type ProcessWriteBackground = keyof typeof BGS | DeprecatedColors;

export type ProcessWriteAttributes = keyof typeof ATTRIBUTES;

//

export interface ProcessWriteObjectShort {
  s: string;
  c?: ProcessWriteColor;
  b?: ProcessWriteBackground;
  a?: ProcessWriteAttributes[];
}
export interface ProcessWriteObjectSimple {
  str: string;
  cl?: ProcessWriteColor;
  bg?: ProcessWriteBackground;
  at?: ProcessWriteAttributes[];
}
export interface ProcessWriteObjectVerbose {
  string: string;
  color?: ProcessWriteColor;
  background?: ProcessWriteBackground;
  attributes?: ProcessWriteAttributes[];
}

export type ProcessWriteObject = ProcessWriteObjectShort | ProcessWriteObjectSimple | ProcessWriteObjectVerbose;

export function processWrite(
  string: string,
  color?: ProcessWriteColor,
  background?: ProcessWriteBackground,
  attributes?: ProcessWriteAttributes[],
): string;
export function processWrite(object: ProcessWriteObject): string;
export function processWrite(
  strOrObject: string | ProcessWriteObject,
  color?: ProcessWriteColor,
  bg?: ProcessWriteBackground,
  at?: ProcessWriteAttributes[],
) {
  const config: ProcessWriteObjectShort = { s: '', c: undefined, b: undefined, a: undefined };
  if (isObject(strOrObject)) {
    if ('s' in strOrObject) config.s = strOrObject.s;
    if ('str' in strOrObject) config.s = strOrObject.str;
    if ('string' in strOrObject) config.s = strOrObject.string;

    if ('c' in strOrObject) config.c = strOrObject.c;
    if ('cl' in strOrObject) config.c = strOrObject.cl;
    if ('color' in strOrObject) config.c = strOrObject.color;

    if ('b' in strOrObject) config.b = strOrObject.b;
    if ('bg' in strOrObject) config.b = strOrObject.bg;
    if ('background' in strOrObject) config.b = strOrObject.background;

    if ('a' in strOrObject) config.a = strOrObject.a;
    if ('at' in strOrObject) config.a = strOrObject.at;
    if ('attributes' in strOrObject) config.a = strOrObject.attributes;
  } else {
    config.s = String(strOrObject);
    config.c = color;
    config.b = bg;
    config.a = at;
  }

  let isColorized = false;

  if (config.c !== undefined && COLORS[config.c] !== undefined) {
    isColorized = true;
    config.s = preColorize(config.s, COLORS[config.c]);
  }

  if (config.b !== undefined && BGS[config.b] !== undefined) {
    isColorized = true;
    config.s = preColorize(config.s, BGS[config.b]);
  }

  if (config.a !== undefined) {
    for (const configAttribute of config.a) {
      if (ATTRIBUTES[configAttribute] !== undefined) {
        isColorized = true;
        config.s = preColorize(config.s, ATTRIBUTES[configAttribute]);
      }
    }
  }

  if (isColorized) {
    config.s = postColorize(config.s);
  }

  process.stdout.write(config.s);

  return config.s;
}

export function processWrites(array: Array<string | ProcessWriteObject>): string {
  if (!isArray(array)) return '';

  let string = '';
  for (const element of array) {
    string += isString(element) ? processWrite(element) : processWrite(element);
  }

  return string;
}

//

function preColorize(output: string, color: number) {
  return `\u001B[${color}m${output}`;
}

function postColorize(output: string) {
  return `${output}\u001B[0m`;
}
