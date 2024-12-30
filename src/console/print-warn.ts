import { isBoolean, isString } from 'oro-functions-client';

import type { PrintOptions } from './print-text';
import { type ProcessWriteColor, processWrites } from './process-write';

export function printWarn(
  msg: string,
  { start = '', end = '\n', showDatetime = true, showLabel = true }: PrintOptions = {},
): string {
  const prefix = isString(start) ? start : '';
  const suffix = isString(end) ? end : '\n';
  const withDatetime = isBoolean(showDatetime) ? showDatetime : true;
  const withLabel = isBoolean(showLabel) ? showLabel : true;

  return processWrites([
    ...(prefix ? [prefix] : []),
    ...(withDatetime ? [{ s: `[${new Date().toISOString()}] `, c: 'gray' as ProcessWriteColor }] : []),
    ...(withLabel ? [{ s: 'warn ', c: 'yellow' as ProcessWriteColor }] : []),
    ...(withLabel ? [msg] : [{ s: msg, c: 'yellow' as ProcessWriteColor }]),
    ...(suffix ? [suffix] : []),
  ]);
}
