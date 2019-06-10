import {
  FOLDER_UPDATE_CHECK_POINT_LOADING,
  FOLDER_UPDATE_CHECK_POINT_LOADED,
  FOLDER_UPDATE_CHECK_POINT_ERROR,
  FOLDER_UPDATE_MOA_VALUE,
  FOLDER_LOADING,
  FOLDER_LOADED,
  FOLDER_ERROR,
  LOGOUT,
  FOLDER_CLEAN_MOA_VALUE,
} from '../../../types';
import { BooleanNumber } from '../../entities/types';

export enum FolderCheckPointStatus {
  SENDING = 'sending',
  ERROR = 'error',
}

export interface FolderPendingItem {
  loading?: boolean;
  checkPoint?: {
    [index: number]:
      | {
          status?: FolderCheckPointStatus;
          prevValue?: BooleanNumber;
        }
      | undefined;
  };
  moa?: {
    [key: string]: string;
  }
}

export interface FolderState {
  pending: {
    [index: number]: FolderPendingItem | undefined;
  };
}

export interface FolderFolderLoadingAction {
  type: typeof FOLDER_LOADING;
  idDpOperation: number;
}

export interface FolderFolderErrorAction {
  type: typeof FOLDER_ERROR;
  idDpOperation: number;
}

export interface FolderFolderLoadedAction {
  type: typeof FOLDER_LOADED;
  idDpOperation: number;
  normalized: {};
}

export interface FolderFolderUpdateCheckpointLoadingAction {
  type: typeof FOLDER_UPDATE_CHECK_POINT_LOADING;
  folderId: number;
  checkPointId: number;
  prevValue: BooleanNumber;
}

export interface FolderFolderUpdateChekpointLoadedAction {
  type: typeof FOLDER_UPDATE_CHECK_POINT_LOADED;
  folderId: number;
  checkPointId: number;
}

export interface FolderFolderUpdateCheckpointErrorAction {
  type: typeof FOLDER_UPDATE_CHECK_POINT_ERROR;
  folderId: number;
  checkPointId: number;
}

export interface FolderUpdateMoaValue {
  type: typeof FOLDER_UPDATE_MOA_VALUE;
  key: string;
  value: string;
  idDpOperation: number;
}

export interface FoldercleanMoaValue {
  type: typeof FOLDER_CLEAN_MOA_VALUE;
  idDpOperation: number;
}

export interface FolderLogoutAction {
  type: typeof LOGOUT;
}

export type FolderAction =
  | FolderFolderLoadingAction
  | FolderFolderErrorAction
  | FolderFolderLoadedAction
  | FolderFolderUpdateCheckpointLoadingAction
  | FolderFolderUpdateChekpointLoadedAction
  | FolderFolderUpdateCheckpointErrorAction
  | FolderUpdateMoaValue
  | FoldercleanMoaValue
  | FolderLogoutAction;
