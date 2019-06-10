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
  FOLDER_UPDATE_MOA_ERROR,
  FOLDER_UPDATE_MOA_LOADED,
  FOLDER_UPDATE_MOA_LOADING,
} from '../../../types';
import { BooleanNumber, FolderMOAString } from '../../entities/types';

export enum FolderCheckPointStatus {
  SENDING = 'sending',
  ERROR = 'error',
}

export interface FolderPendingItem {
  loading?: boolean;
  moaLoading?: boolean;
  checkPoint?: {
    [index: number]:
      | {
          status?: FolderCheckPointStatus;
          prevValue?: BooleanNumber;
        }
      | undefined;
  };
  moa?: {
    [index: string]: string;
  };
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

export interface FolderFolderUpdateMoaValue {
  type: typeof FOLDER_UPDATE_MOA_VALUE;
  key: string;
  value: string;
  idDpOperation: number;
}

export interface FolderFoldercleanMoaValue {
  type: typeof FOLDER_CLEAN_MOA_VALUE;
  idDpOperation: number;
}

export interface FolderLogoutAction {
  type: typeof LOGOUT;
}

export interface FolderFolderUpdateMoaLoading {
  type: typeof FOLDER_UPDATE_MOA_LOADING;
  idDpOperation: number;
}

export interface FolderFolderUpdateMoaError {
  type: typeof FOLDER_UPDATE_MOA_ERROR;
  idDpOperation: number;
}

export interface FolderFolderUpdateMoaLoaded {
  type: typeof FOLDER_UPDATE_MOA_LOADED;
  idDpOperation: number;
}

export type FolderAction = | FolderFolderLoadingAction
  | FolderFolderErrorAction
  | FolderFolderLoadedAction
  | FolderFolderUpdateCheckpointLoadingAction
  | FolderFolderUpdateChekpointLoadedAction
  | FolderFolderUpdateCheckpointErrorAction
  | FolderFolderUpdateMoaValue
  | FolderFoldercleanMoaValue
  | FolderFolderUpdateMoaLoading
  | FolderFolderUpdateMoaLoaded
  | FolderFolderUpdateMoaError
  | FolderLogoutAction;
