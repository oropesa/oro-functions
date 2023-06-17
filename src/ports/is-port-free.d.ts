import { SResponse } from 'oro-functions-client';
import { PortFreeObject } from './get-port-free';

export interface IsPortFreeError {
    msg: string;
    port: number;
}

export type IsPortFreeResponse = SResponse<PortFreeObject, IsPortFreeError>;

export type isPortFree = ( port: number ) => Promise<IsPortFreeResponse>;

//deprecated
export type isPortAvailable = ( port: number ) => Promise<IsPortFreeResponse>;