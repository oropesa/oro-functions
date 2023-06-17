import { SResponse } from 'oro-functions-client';

export interface OConfigArgs {
  file?: string;
  deep?: number;
  defaultParams?: string[];
  extraParams?: string[];
}

export interface OConfigDefaultParams {
  environment: string;
  projectname: string;
  projectserver: string;
}

export interface OConfigObject<T extends object = OConfigDefaultParams> {
  config: T;
}

export interface OConfigError {
  msg: string;
  args?: OConfigArgs;
}

export type OConfigResponse<T extends object = OConfigDefaultParams> = SResponse<OConfigObject<T>, OConfigError>;

export type obtainOConfig = <T extends object = OConfigDefaultParams>( args?: OConfigArgs ) => Promise<OConfigResponse<T>>;

export type obtainOConfigSync = <T extends object = OConfigDefaultParams>( args?: OConfigArgs ) => OConfigResponse<T>;

// deprecated
export type obtainOroConfig = <T extends object = OConfigDefaultParams>( args?: OConfigArgs ) => Promise<OConfigResponse<T>>;
// deprecated
export type obtainOroConfigSync = <T extends object = OConfigDefaultParams>( args?: OConfigArgs ) => OConfigResponse<T>;
