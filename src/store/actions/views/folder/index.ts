import { normalize } from 'normalizr';

import { addMessageToQueue } from '../../../../components/Alert';
import captureException from '../../../../tools/errorReporting/captureException.js';

import { API_PATH } from '../../../../variables';

import {
  FOLDER_UPDATE_CHECK_POINT_LOADING,
  FOLDER_UPDATE_CHECK_POINT_LOADED,
  FOLDER_UPDATE_CHECK_POINT_ERROR,
  FOLDER_LOADING,
  FOLDER_LOADED,
  FOLDER_ERROR,
  FOLDER_UPDATE_MOA_VALUE,
  FOLDER_CLEAN_MOA_VALUE,
  FOLDER_UPDATE_MOA_LOADING,
  FOLDER_UPDATE_MOA_ERROR,
  FOLDER_UPDATE_MOA_LOADED,
} from '../../../types';

import { operation } from '../../../reducer/entities/schema';
import { AppState } from '../../../../store';
import { ThunkAction } from '../../../actions';
import {
  FolderFolderUpdateCheckpointLoadingAction,
  FolderFolderUpdateChekpointLoadedAction,
  FolderFolderUpdateCheckpointErrorAction,
  FolderFolderLoadingAction,
  FolderFolderLoadedAction,
  FolderFolderErrorAction,
  FolderFolderUpdateMoaValue,
  FolderFoldercleanMoaValue,
  FolderFolderUpdateMoaLoading,
  FolderFolderUpdateMoaError,
  FolderFolderUpdateMoaLoaded,
} from '../../../reducer/views/folder/types';
import { ListListLoadedNormalized } from '../../../reducer/views/list/type';
import {
  BooleanNumber,
  FoldersUpdateMoaLoaded,
  FolderMOAString,
} from '../../../reducer/entities/types';
import rest from '../../../../tools/rest';

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

export const folderUpdateLoading = (idDpOperation: number): FolderFolderLoadingAction => ({
  type: FOLDER_LOADING,
  idDpOperation,
});

export const folderUpdateLoaded = (
  idDpOperation: number,
  normalized: ListListLoadedNormalized,
): FolderFolderLoadedAction => ({
  type: FOLDER_LOADED,
  idDpOperation,
  normalized,
});

export const folderUpdateError = (idDpOperation: number): FolderFolderErrorAction => ({
  type: FOLDER_ERROR,
  idDpOperation,
});

export const folderUpdateMoaValue = (
  idDpOperation: number,
  key: string,
  value: string,
): FolderFolderUpdateMoaValue => ({
  type: FOLDER_UPDATE_MOA_VALUE,
  idDpOperation,
  key,
  value,
});
export const folderCleanMoaValue = (idDpOperation: number): FolderFoldercleanMoaValue => ({
  type: FOLDER_CLEAN_MOA_VALUE,
  idDpOperation,
});

export const fetchFolder = (idDpOperation: number): ThunkAction => async (dispatch, getState) => {
  dispatch(folderUpdateLoading(idDpOperation));
  const { apiKey } = getState().user;

  try {
    const res = await rest(`${API_PATH}detailaction/${idDpOperation}`);

    const json = await res.json();

    if (json.status === 'success' && json.values[0]) {
      const normalized = normalize(json.values[0], operation);
      dispatch(folderUpdateLoaded(idDpOperation, normalized));
    } else {
      addMessageToQueue({
        duration: 2500,
        type: 'error',
        message: "Erreur pendant la récupération des informations de l'opération",
      });
      dispatch(folderUpdateError(idDpOperation));
    }
  } catch (error) {
    captureException(error);
    addMessageToQueue({
      duration: 2500,
      type: 'error',
      message: "Erreur pendant la récupération des informations de l'opération",
    });
    dispatch(folderUpdateError(idDpOperation));
  }
};

export const updateFolderCheckPoint = ({
  folderId,
  checkPointId,
}: {
folderId: number;
checkPointId: number;
}): ThunkAction => (dispatch, getState) => {
  const checkPoint = getState().entities.checkPoints[checkPointId];
  const prevValue = checkPoint ? checkPoint.pivot.valide : 0;

  dispatch(folderUpdateCheckPointLoading({ folderId, checkPointId, prevValue }));

  try {
    addMessageToQueue({
      duration: 2500,
      type: 'info',
      message: 'fake action',
    });
    setTimeout(() => {
      dispatch(folderUpdateCheckPointLoaded({ folderId, checkPointId }));
    }, 500);
  } catch (error) {
    captureException(error);
    addMessageToQueue({
      duration: 2500,
      type: 'error',
      message: 'Erreur pendant la mise à jout du point de controle',
    });
    dispatch(folderUpdateCheckPointError({ folderId, checkPointId }));
  }
};

export const folderUpdateMoaLoading = (idDpOperation: number): FolderFolderUpdateMoaLoading => ({
  type: FOLDER_UPDATE_MOA_LOADING,
  idDpOperation,
});

export const folderUpdateMoaLoaded = (
  idDpOperation: number,
  id_dossierprime: number,
  values: { [index: string]: string },
): FolderFolderUpdateMoaLoaded & FoldersUpdateMoaLoaded => ({
  type: FOLDER_UPDATE_MOA_LOADED,
  idDpOperation,
  id_dossierprime,
  values,
});

export const folderUpdateMoaError = (idDpOperation: number): FolderFolderUpdateMoaError => ({
  type: FOLDER_UPDATE_MOA_ERROR,
  idDpOperation,
});

export const updateMoaValues = (
  idDossierPrime: number,
  idDpOperation: number,
): ThunkAction => async (dispatch, getState) => {
  try {
    const { apiKey } = getState().user;
    const pending = getState().views.folder.pending[idDpOperation];

    if (!pending) throw new Error('Pending is missing for MOa update');
    const values = pending.moa || {};

    dispatch(folderUpdateMoaLoading(idDpOperation));

    const res = await rest(`${API_PATH}updatedossierprime/${idDossierPrime}`, {
      method: 'post',
      body: JSON.stringify(values),
    });

    if (res.status === 200) {
      addMessageToQueue({
        duration: 2500,
        type: 'info',
        message: 'Les infos du MOA ont étaient mise à jour',
      });
      dispatch(folderUpdateMoaLoaded(idDpOperation, idDossierPrime, values));
    } else {
      addMessageToQueue({
        duration: 4500,
        type: 'error',
        message: 'Erreur pendant la mise à jour des infos du MOA',
      });
      dispatch(folderUpdateMoaError(idDpOperation));
    }
  } catch (error) {
    addMessageToQueue({
      duration: 4500,
      type: 'error',
      message: 'Erreur pendant la mise à jour des infos du MOA',
    });
    dispatch(folderUpdateMoaError(idDpOperation));
  }
};
