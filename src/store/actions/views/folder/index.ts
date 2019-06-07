import { normalize } from 'normalizr';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { API_PATH } from '../../../../variables';

import {
  FOLDER_UPDATE_CHECK_POINT_LOADING,
  FOLDER_UPDATE_CHECK_POINT_LOADED,
  FOLDER_UPDATE_CHECK_POINT_ERROR,
  FOLDER_LOADING,
  FOLDER_LOADED,
  FOLDER_ERROR,
} from '../../../types';

import { datahand } from './mockApi';

import { operation } from '../../../reducer/entities/schema';
import { AppState } from '../../../../store';
import {
  FolderFolderUpdateCheckpointLoadingAction,
  FolderFolderUpdateChekpointLoadedAction,
  FolderFolderUpdateCheckpointErrorAction,
  FolderFolderLoadingAction,
  FolderFolderLoadedAction,
  FolderFolderErrorAction,
} from '../../../reducer/views/folder/types';
import { ListListLoadedNormalized } from '../../../reducer/views/list/type';
import { BooleanNumber } from '../../../reducer/entities/types';

type FolderUpdateCheckPointLoadingParams = {
  folderId: number;
  checkPointId: number;
  prevValue: BooleanNumber;
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

export const folderUpdateLoading = (
  idDpOperation: number
): FolderFolderLoadingAction => ({
  type: FOLDER_LOADING,
  idDpOperation,
});

export const folderUpdateLoaded = (
  idDpOperation: number,
  normalized: ListListLoadedNormalized
): FolderFolderLoadedAction => ({
  type: FOLDER_LOADED,
  idDpOperation,
  normalized,
});

export const folderUpdateError = (
  idDpOperation: number
): FolderFolderErrorAction => ({
  type: FOLDER_ERROR,
  idDpOperation,
});

export const fetchFolder = (
  idDpOperation: number
): ThunkAction<void, AppState, null, Action<string>> => async (
  dispatch,
  getState
) => {
  dispatch(folderUpdateLoading(idDpOperation));
  const { apiKey } = getState().user;

  try {
    const res = await fetch(`${API_PATH}detailaction/${idDpOperation}`, {
      method: 'get',
      headers: new Headers({
        'user-agent': 'Mozilla/4.0 MDN Example',
        'content-type': 'application/json',
        Authorization: `bearer ${apiKey}`,
      }),
    });

    const json = await res.json();

    if (json.status === 'success' && json.values[0]) {
      const normalized = normalize(json.values[0], operation);
      dispatch(folderUpdateLoaded(idDpOperation, normalized));
    } else {
      dispatch(folderUpdateError(idDpOperation));
    }
  } catch (error) {
    dispatch(folderUpdateError(idDpOperation));
  }
};

export const updateFolderCheckPoint = ({
  folderId,
  checkPointId,
}: {
  folderId: number;
  checkPointId: number;
}): ThunkAction<void, AppState, null, Action<string>> => (
  dispatch,
  getState
) => {
  const checkPoint = getState().entities.checkPoints[checkPointId];
  const prevValue = checkPoint ? checkPoint.pivot.valide : 0;

  dispatch(
    folderUpdateCheckPointLoading({ folderId, checkPointId, prevValue })
  );

  try {
    setTimeout(() => {
      dispatch(folderUpdateCheckPointLoaded({ folderId, checkPointId }));
    }, 500);
  } catch (error) {
    dispatch(folderUpdateCheckPointError({ folderId, checkPointId }));
  }
};
