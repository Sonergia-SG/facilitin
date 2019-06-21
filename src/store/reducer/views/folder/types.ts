import {
  FOLDER_UPDATE_CHECK_POINT_LOADING,
  FOLDER_UPDATE_CHECK_POINT_LOADED,
  FOLDER_UPDATE_CHECK_POINT_ERROR,
  FOLDER_UPDATE_MOA_VALUE,
  FOLDER_UPDATE_MOE_VALUE,
  FOLDER_LOADING,
  FOLDER_LOADED,
  FOLDER_ERROR,
  LOGOUT,
  FOLDER_CLEAN_MOA_VALUE,
  FOLDER_UPDATE_MOA_ERROR,
  FOLDER_UPDATE_MOA_LOADED,
  FOLDER_UPDATE_MOA_LOADING,
  FOLDER_FILE_LITIGE_LOADING,
  FOLDER_FILE_LITIGE_ERROR,
  FOLDER_FILE_LITIGE_LOADED,
  FOLDER_ENDING_LOADING,
  FOLDER_ENDING_LOADED,
  FOLDER_ENDING_ERROR,
  FOLDER_CLEAN_MOE_VALUE,
  FOLDER_UPDATE_MOE_LOADING,
  FOLDER_UPDATE_MOE_ERROR,
  FOLDER_UPDATE_MOE_LOADED,
} from '../../../types';
import { BooleanNumber } from '../../entities/types';

export type FolderCheckPointStatus = 'SENDING' | 'ERROR';

export interface FolderPendingItem {
  loading?: boolean;
  moaLoading?: boolean;
  moeLoading?: boolean;
  endingLoading?: boolean;
  litigeLoading?: boolean;
  litige?: {
    [index: number]: {
      loading: boolean;
    };
  };
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
  moe?: {
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
  prevValue: BooleanNumber;
}

export interface FolderFolderUpdateMoaValue {
  type: typeof FOLDER_UPDATE_MOA_VALUE;
  key: string;
  value: string;
  idDpOperation: number;
}

export interface FolderFolderUpdateMoeValue {
  type: typeof FOLDER_UPDATE_MOE_VALUE;
  key: string;
  value: string;
  idDpOperation: number;
}

export interface FolderFoldercleanMoaValue {
  type: typeof FOLDER_CLEAN_MOA_VALUE;
  idDpOperation: number;
}

export interface FolderFoldercleanMoeValue {
  type: typeof FOLDER_CLEAN_MOE_VALUE;
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

export interface FolderFolderUpdateMoeLoading {
  type: typeof FOLDER_UPDATE_MOE_LOADING;
  idDpOperation: number;
}

export interface FolderFolderUpdateMoeError {
  type: typeof FOLDER_UPDATE_MOE_ERROR;
  idDpOperation: number;
}

export interface FolderFolderUpdateMoeLoaded {
  type: typeof FOLDER_UPDATE_MOE_LOADED;
  idDpOperation: number;
}

export interface FolderFolderLitigeLoading {
  type: typeof FOLDER_FILE_LITIGE_LOADING;
  idDpOperation: number;
  idDpFile: number;
}

export interface FolderFolderLitigeError {
  type: typeof FOLDER_FILE_LITIGE_ERROR;
  idDpOperation: number;
  idDpFile: number;
}

export interface FolderFolderLitigeLoaded {
  type: typeof FOLDER_FILE_LITIGE_LOADED;
  idDpOperation: number;
  idDpFile: number;
}

export interface FolderFolderEndingLoading {
  type: typeof FOLDER_ENDING_LOADING;
  idDpOperation: number;
}

export interface FolderFolderEndingLoaded {
  type: typeof FOLDER_ENDING_LOADED;
  idDpOperation: number;
}

export interface FolderFolderEndingError {
  type: typeof FOLDER_ENDING_ERROR;
  idDpOperation: number;
}

export type FolderAction = | FolderFolderLoadingAction
| FolderFolderErrorAction
| FolderFolderLoadedAction
| FolderFolderUpdateCheckpointLoadingAction
| FolderFolderUpdateChekpointLoadedAction
| FolderFolderUpdateCheckpointErrorAction
| FolderFolderUpdateMoaValue
| FolderFolderUpdateMoeValue
| FolderFoldercleanMoaValue
| FolderFoldercleanMoeValue
| FolderFolderUpdateMoaLoading
| FolderFolderUpdateMoaLoaded
| FolderFolderUpdateMoaError
| FolderFolderUpdateMoeLoading
| FolderFolderUpdateMoeLoaded
| FolderFolderUpdateMoeError
| FolderFolderLitigeLoading
| FolderFolderLitigeLoaded
| FolderFolderLitigeError
| FolderFolderEndingLoading
| FolderFolderEndingLoaded
| FolderFolderEndingError
| FolderLogoutAction;
