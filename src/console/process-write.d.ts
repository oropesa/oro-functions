export type ProcessWriteObject =
  | { s?: string, c?: string, b?: string }
  | { str?: string, cl?: string, bg?: string }
  | { string?: string, color?: string, background?: string }

export type processWrite = (
  strOrObject: string | ProcessWriteObject,
  color?: string,
  bg?: string
) => string;

export type processWrites = ( arr: Array<string | ProcessWriteObject> ) => string