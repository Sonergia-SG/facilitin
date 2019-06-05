import { normalize } from 'normalizr';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import {
  FOLDER_UPDATE_CHECK_POINT_LOADING,
  FOLDER_UPDATE_CHECK_POINT_LOADED,
  FOLDER_UPDATE_CHECK_POINT_ERROR,
  FOLDER_LOADING,
  FOLDER_LOADED,
  FOLDER_ERROR,
} from '../../../types';

import { datahand } from './mockApi';

import { folder } from '../../../reducer/entities/schema';
import { AppState } from '../../../../store';
import {
  FolderFolderUpdateCheckpointLoadingAction,
  FolderFolderUpdateChekpointLoadedAction,
  FolderFolderUpdateCheckpointErrorAction,
  FolderFolderLoadingAction,
  FolderFolderLoadedAction,
  FolderFolderErrorAction,
  FolderCheckPointValue,
} from '../../../reducer/views/folder/types';
import { ListListLoadedNormalized } from '../../../reducer/views/list/type';

type FolderUpdateCheckPointLoadingParams = {
  folderId: number;
  checkPointId: number;
  prevValue: FolderCheckPointValue;
};

export const folderUpdateCheckPointLoading = ({
  folderId,
  checkPointId,
  prevValue,
}: FolderUpdateCheckPointLoadingParams): FolderFolderUpdateCheckpointLoadingAction => ({
  type: FOLDER_UPDATE_CHECK_POINT_LOADING,
  folderId,
  checkPointId,
  prevValue,
});

type FolderUpdateCheckPointLoadedParams = {
  folderId: number;
  checkPointId: number;
};

export const folderUpdateCheckPointLoaded = ({
  folderId,
  checkPointId,
}: FolderUpdateCheckPointLoadedParams): FolderFolderUpdateChekpointLoadedAction => ({
  type: FOLDER_UPDATE_CHECK_POINT_LOADED,
  folderId,
  checkPointId,
});
type FolderUpdateCheckPointErrorParams = {
  folderId: number;
  checkPointId: number;
};

export const folderUpdateCheckPointError = ({
  folderId,
  checkPointId,
}: FolderUpdateCheckPointErrorParams): FolderFolderUpdateCheckpointErrorAction => ({
  type: FOLDER_UPDATE_CHECK_POINT_ERROR,
  folderId,
  checkPointId,
});

export const folderUpdateLoading = (folderId: number): FolderFolderLoadingAction => ({
  type: FOLDER_LOADING,
  folderId,
});

export const folderUpdateLoaded = (
  folderId: number,
  normalized: ListListLoadedNormalized,
): FolderFolderLoadedAction => ({
  type: FOLDER_LOADED,
  folderId,
  normalized,
});

export const folderUpdateError = (folderId: number): FolderFolderErrorAction => ({
  type: FOLDER_ERROR,
  folderId,
});

export const fetchFolder = (
  folderId: number,
): ThunkAction<void, AppState, null, Action<string>> => (dispatch) => {
  dispatch(folderUpdateLoading(folderId));

  try {
    setTimeout(() => {
      const normalized = normalize(datahand, folder);
      dispatch(folderUpdateLoaded(folderId, normalized));
    }, 500);
  } catch (error) {
    dispatch(folderUpdateError(folderId));
  }
};

export const updateFolderCheckPoint = ({
  folderId,
  checkPointId,
}: {
folderId: number;
checkPointId: number;
}): ThunkAction<void, AppState, null, Action<string>> => (dispatch, getState) => {
  const checkPoint = getState().entities.checkPoints[checkPointId];
  const prevValue = checkPoint ? checkPoint.controle_valide : 0;

  dispatch(folderUpdateCheckPointLoading({ folderId, checkPointId, prevValue }));

  try {
    setTimeout(() => {
      dispatch(folderUpdateCheckPointLoaded({ folderId, checkPointId }));
    }, 500);
  } catch (error) {
    dispatch(folderUpdateCheckPointError({ folderId, checkPointId }));
  }
};
