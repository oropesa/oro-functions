import { isBoolean, isString } from 'oro-functions-client';

import { type ProcessWriteColor, processWrites } from './process-write';

export interface PrintOptions {
  start?: string;
  end?: string;
  showLabel?: boolean;
  showDatetime?: boolean;
}

export interface PrintTextOptions {
  start?: string;
  end?: string;
  showDatetime?: boolean;
}

export function printText(msg: string, { start = '', end = '\n', showDatetime = true }: PrintTextOptions = {}): string {
  const prefix = isString(start) ? start : '';
  const suffix = isString(end) ? end : '\n';
  const withDatetime = isBoolean(showDatetime) ? showDatetime : true;

  return processWrites([
    ...(prefix ? [prefix] : []),
    ...(withDatetime ? [{ s: `[${new Date().toISOString()}] `, c: 'gray' as ProcessWriteColor }] : []),
    msg,
    ...(suffix ? [suffix] : []),
  ]);
}
