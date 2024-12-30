import { isBoolean, isString } from 'oro-functions-client';

import type { PrintOptions } from './print-text';
import { type ProcessWriteColor, processWrites } from './process-write';

export function printSuccess(
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
    ...(withLabel ? [{ s: 'success ', c: 'green' as ProcessWriteColor }] : []),
    ...(withLabel ? [msg] : [{ s: msg, c: 'green' as ProcessWriteColor }]),
    ...(suffix ? [suffix] : []),
  ]);
}

export function printDone(
  msg = 'Done',
  { start = '', end = '\n', showDatetime = false, showLabel = false }: PrintOptions = {},
) {
  const withDatetime = isBoolean(showDatetime) ? showDatetime : false;
  const withLabel = isBoolean(showLabel) ? showLabel : false;

  return printSuccess(msg, { start, end, showDatetime: withDatetime, showLabel: withLabel });
}
