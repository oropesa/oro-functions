import { SResponse } from 'oro-functions-client';

export interface PortFreeObject {
    port: number;
}

export interface GetPortFreeError {
    msg: string;
    port?: number;
    opts?: {
        random?: boolean;
        port?: number;
        ports?: number[];
        portRange?: number[];
    };
    err?: any;
}

export type GetPortFreeResponse = SResponse<PortFreeObject, GetPortFreeError>;


export type getPortFree = ( portStart?: number | number[], portEnd?: number ) => Promise<GetPortFreeResponse>;