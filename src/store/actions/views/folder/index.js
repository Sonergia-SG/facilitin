// @flow
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
import capture from '../../../../tools/errorReporting/captureException';

import { folder } from '../../../reducer/entities/schema';

import {
  type CheckPointsActionUpdateLoading,
  type CheckPointsActionLoaded,
  type CheckPointsActionUpdateError,
} from '../../../reducer/entities/checkPoints';

import {
  type FolderReducerActionFolderLoaded,
  type FolderReducerActionFolderError,
  type FolderReducerActionFolderLoading,
} from '../../../reducer/views/folder';
import { type Normalized } from '../../../reducer/entities/flowTypes';
import { type State } from '../../../reducer';

type FolderUpdateCheckPointLoading = (p: {
  folderId: string,
  checkPointId: string,
  prevValue: number,
}) => CheckPointsActionUpdateLoading;

export const folderUpdateCheckPointLoading: FolderUpdateCheckPointLoading = ({
  folderId,
  checkPointId,
  prevValue,
}) => ({
  type: FOLDER_UPDATE_CHECK_POINT_LOADING,
  folderId,
  checkPointId,
  prevValue,
});

type FolderUpdateCheckPointLoaded = (p: {
  folderId: typeof FOLDER_UPDATE_CHECK_POINT_LOADED,
  checkPointId: string,
}) => {};

export const folderUpdateCheckPointLoaded: FolderUpdateCheckPointLoaded = () => ({
  type: FOLDER_UPDATE_CHECK_POINT_LOADED,
});

type FolderUpdateCheckPointError = (p: {
  folderId: string,
  checkPointId: string,
  prevValue: number,
}) => CheckPointsActionUpdateError;

export const folderUpdateCheckPointError: FolderUpdateCheckPointError = ({
  folderId,
  checkPointId,
  prevValue,
}) => ({
  type: FOLDER_UPDATE_CHECK_POINT_ERROR,
  folderId,
  checkPointId,
  prevValue,
});

type FolderUpdateLoading = (folderId: string) => FolderReducerActionFolderLoading;

export const folderUpdateLoading: FolderUpdateLoading = folderId => ({
  type: FOLDER_LOADING,
  folderId,
});

type FolderUpdateLoaded = (
  folderId: string,
  normalized: Normalized
) => FolderReducerActionFolderLoaded & CheckPointsActionLoaded;

export const folderUpdateLoaded: FolderUpdateLoaded = (folderId, normalized) => ({
  type: FOLDER_LOADED,
  folderId,
  normalized,
});

type FolderUpdateErrors = (folderId: string) => FolderReducerActionFolderError;

export const folderUpdateError: FolderUpdateErrors = folderId => ({
  type: FOLDER_ERROR,
  folderId,
});

type Dispatch = mixed => void;

type GetState = () => State;

type FetchFolder = (folderId: string) => (dispatch: Dispatch) => void;

export const fetchFolder: FetchFolder = folderId => (dispatch) => {
  dispatch(folderUpdateLoading(folderId));

  try {
    setTimeout(() => {
      const normalized = normalize(datahand, folder);
      dispatch(folderUpdateLoaded(folderId, normalized));
    }, 500);
  } catch (error) {
    capture(error);
    dispatch(folderUpdateError(folderId));
  }
};

type UpdateFolderCheckPoint = ({ folderId: string, checkPointId: string }) => (
  dispatch: Dispatch,
  getState: GetState
) => void;

export const updateFolderCheckPoint: UpdateFolderCheckPoint = ({ folderId, checkPointId }) => (
  dispatch,
  getState,
) => {
  const prevValue = getState().entities.checkPoints[checkPointId].controle_valide;

  try {
    dispatch(folderUpdateCheckPointLoading({ folderId, checkPointId, prevValue }));

    setTimeout(() => {
      dispatch(folderUpdateCheckPointLoaded({ folderId, checkPointId }));
    }, 500);
  } catch (error) {
    capture(error);
    dispatch(folderUpdateCheckPointError({ folderId, checkPointId, prevValue }));
  }
};

export type FolderACtions =
  | UpdateFolderCheckPoint
  | FetchFolder
  | FolderUpdateErrors
  | FolderUpdateLoaded
  | FolderUpdateLoading
  | FolderUpdateCheckPointError
  | FolderUpdateCheckPointLoaded
  | FolderUpdateCheckPointLoading;
