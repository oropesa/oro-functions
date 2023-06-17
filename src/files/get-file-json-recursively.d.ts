export type getFileJsonRecursively = <T>(
  filenameOrPath: string,
  parentDeep?: number,
) => Promise<T>;

export type getFileJsonRecursivelySync = <T>(
  filenameOrPath: string,
  parentDeep?: number,
) => T;