import {
  FOLDER_UPDATE_CHECK_POINT_LOADING,
  FOLDER_UPDATE_CHECK_POINT_LOADED,
  FOLDER_UPDATE_CHECK_POINT_ERROR,
  FOLDER_LOADING,
  FOLDER_LOADED,
  FOLDER_ERROR,
  LOGOUT,
} from '../../../types';

export enum FolderCheckPointStatus {
  SENDING = 'sending',
  ERROR = 'error',
}

export enum FolderCheckPointValue {
  ON = 1,
  OFF = 0,
}

export interface FolderPendingItem {
  loading?: boolean;
  checkPoint?: {
    [index: number]: {
      status?: FolderCheckPointStatus;
      prevValue?: FolderCheckPointValue;
    } | undefined;
  };
}

export interface FolderState {
  pending: {
    [index: number]: FolderPendingItem;
  };
}

export interface FolderFolderLoadingAction {
  type: typeof FOLDER_LOADING;
  folderId: number;
}

export interface FolderFolderErrorAction {
  type: typeof FOLDER_ERROR;
  folderId: number;
}

export interface FolderFolderLoadedAction {
  type: typeof FOLDER_LOADED;
  folderId: number;
  normalized: {};
}

export interface FolderFolderUpdateCheckpointLoadingAction {
  type: typeof FOLDER_UPDATE_CHECK_POINT_LOADING;
  folderId: number;
  checkPointId: number;
  prevValue: FolderCheckPointValue;
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

export interface FolderLogoutAction {
  type: typeof LOGOUT;
}

export type FolderAction = | FolderFolderLoadingAction
  | FolderFolderErrorAction
  | FolderFolderLoadedAction
  | FolderFolderUpdateCheckpointLoadingAction
  | FolderFolderUpdateChekpointLoadedAction
  | FolderFolderUpdateCheckpointErrorAction
  | FolderLogoutAction;
