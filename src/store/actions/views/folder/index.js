import { normalize } from 'normalizr';

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

export const folderUpdateCheckPointLoading = ({ folderId, checkPointId, prevValue }) => ({
  type: FOLDER_UPDATE_CHECK_POINT_LOADING,
  folderId,
  checkPointId,
  prevValue,
});

export const folderUpdateCheckPointLoaded = ({ folderId, checkPointId }) => ({
  type: FOLDER_UPDATE_CHECK_POINT_LOADED,
  folderId,
  checkPointId,
});

export const folderUpdateCheckPointError = ({ folderId, checkPointId }) => ({
  type: FOLDER_UPDATE_CHECK_POINT_ERROR,
  folderId,
  checkPointId,
});

export const folderUpdateLoading = folderId => ({
  type: FOLDER_LOADING,
  folderId,
});

export const folderUpdateLoaded = (folderId, normalized) => ({
  type: FOLDER_LOADED,
  folderId,
  normalized,
});

export const folderUpdateError = folderId => ({
  type: FOLDER_ERROR,
  folderId,
});

export const fetchFolder = folderId => (dispatch) => {
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

export const updateFolderCheckPoint = ({ folderId, checkPointId }) => (dispatch, getState) => {
  const prevValue = getState().entities.checkPoint[checkPointId].controle_valide;

  dispatch(folderUpdateCheckPointLoading({ folderId, checkPointId, prevValue }));

  try {
    setTimeout(() => {
      dispatch(folderUpdateCheckPointLoaded({ folderId, checkPointId }));
    }, 500);
  } catch (error) {
    dispatch(folderUpdateCheckPointError({ folderId, checkPointId }));
  }
};
