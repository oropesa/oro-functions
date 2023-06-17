import { SResponse } from 'oro-functions-client';

export interface ZipFolderObject {
  zipPath: string;
}

export interface ZipFolderError {
  msg: string;
  folderPath?: string;
  zipPath?: string;
}

export type ZipFolderResponse = SResponse<ZipFolderObject, ZipFolderError>;

export type zipFolder = ( folderPath: string, zipPath?: string ) => Promise<ZipFolderResponse>;