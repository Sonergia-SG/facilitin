import { normalize } from 'normalizr';

import idx from 'idx';
import { addMessageToQueue } from '../../../../components/Alert';
import captureException from '../../../../tools/errorReporting/captureException';

import { API_PATH } from '../../../../variables';

import {
  FolderEndingResponse,
  FolderFileLitigeResponse,
  FolderUpdateCheckPointResponse,
} from './apiTypes';
import {
  FOLDER_UPDATE_CHECK_POINT_LOADING,
  FOLDER_UPDATE_CHECK_POINT_LOADED,
  FOLDER_UPDATE_CHECK_POINT_ERROR,
  FOLDER_LOADING,
  FOLDER_LOADED,
  FOLDER_ERROR,
  FOLDER_UPDATE_MOA_VALUE,
  FOLDER_UPDATE_MOE_VALUE,
  FOLDER_CLEAN_MOA_VALUE,
  FOLDER_UPDATE_MOA_LOADING,
  FOLDER_UPDATE_MOA_ERROR,
  FOLDER_UPDATE_MOA_LOADED,
  FOLDER_FILE_LITIGE_LOADING,
  FOLDER_FILE_LITIGE_LOADED,
  FOLDER_FILE_LITIGE_ERROR,
  FOLDER_ENDING_LOADING,
  FOLDER_ENDING_LOADED,
  FOLDER_ENDING_ERROR,
  FOLDER_CLEAN_MOE_VALUE,
  FOLDER_UPDATE_MOE_LOADING,
  FOLDER_UPDATE_MOE_ERROR,
  FOLDER_UPDATE_MOE_LOADED,
} from '../../../types';

import { operation } from '../../../reducer/entities/schema';
import { ThunkAction } from '../..';
import {
  FolderFolderUpdateCheckpointLoadingAction,
  FolderFolderUpdateChekpointLoadedAction,
  FolderFolderUpdateCheckpointErrorAction,
  FolderFolderLoadingAction,
  FolderFolderLoadedAction,
  FolderFolderErrorAction,
  FolderFolderUpdateMoaValue,
  FolderFolderUpdateMoeValue,
  FolderFoldercleanMoaValue,
  FolderFoldercleanMoeValue,
  FolderFolderUpdateMoaLoading,
  FolderFolderUpdateMoaError,
  FolderFolderUpdateMoaLoaded,
  FolderFolderLitigeLoading,
  FolderFolderLitigeLoaded,
  FolderFolderLitigeError,
  FolderFolderEndingLoading,
  FolderFolderEndingLoaded,
  FolderFolderEndingError,
  FolderFolderUpdateMoeLoaded,
  FolderFolderUpdateMoeError,
  FolderFolderUpdateMoeLoading,
} from '../../../reducer/views/folder/types';
import { ListListLoadedNormalized } from '../../../reducer/views/list/type';
import {
  BooleanNumber,
  FoldersUpdateMoaLoaded,
  CheckPointsFolderUpdateCheckpointLoadingAction,
  CheckPointsFolderUpdateChekpointLoadedAction,
  CheckPointsFolderUpdateCheckpointErrorAction,
  FilesFolcerCheckPointLoaded,
  FileLitigeLoaded,
  OperationStatus,
  OperationsFolderEndingLoaded,
  FoldersUpdateMoeLoaded,
} from '../../../reducer/entities/types';
import rest from '../../../../tools/rest';

interface FolderUpdateCheckPointLoadingParams {
  folderId: number;
  checkPointId: number;
  prevValue: BooleanNumber;
}

export const folderUpdateCheckPointLoading = ({
  folderId,
  checkPointId,
  prevValue,
}: FolderUpdateCheckPointLoadingParams): FolderFolderUpdateCheckpointLoadingAction &
CheckPointsFolderUpdateCheckpointLoadingAction => ({
  type: FOLDER_UPDATE_CHECK_POINT_LOADING,
  folderId,
  checkPointId,
  prevValue,
});

interface FolderUpdateCheckPointLoadedParams {
  folderId: number;
  checkPointId: number;
  statusCode: number | null;
  idDpFile: number;
}

export const folderUpdateCheckPointLoaded = ({
  folderId,
  checkPointId,
  statusCode,
  idDpFile,
}: FolderUpdateCheckPointLoadedParams): FolderFolderUpdateChekpointLoadedAction &
CheckPointsFolderUpdateChekpointLoadedAction &
FilesFolcerCheckPointLoaded => ({
  type: FOLDER_UPDATE_CHECK_POINT_LOADED,
  folderId,
  checkPointId,
  statusCode,
  idDpFile,
});
interface FolderUpdateCheckPointErrorParams {
  folderId: number;
  checkPointId: number;
  prevValue: BooleanNumber;
}

export const folderUpdateCheckPointError = ({
  folderId,
  checkPointId,
  prevValue,
}: FolderUpdateCheckPointErrorParams):
| FolderFolderUpdateCheckpointErrorAction
| CheckPointsFolderUpdateCheckpointErrorAction => ({
  type: FOLDER_UPDATE_CHECK_POINT_ERROR,
  folderId,
  checkPointId,
  prevValue,
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

export const folderUpdateMoeValue = (
  idDpOperation: number,
  key: string,
  value: string,
): FolderFolderUpdateMoeValue => ({
  type: FOLDER_UPDATE_MOE_VALUE,
  idDpOperation,
  key,
  value,
});

export const folderCleanMoaValue = (idDpOperation: number): FolderFoldercleanMoaValue => ({
  type: FOLDER_CLEAN_MOA_VALUE,
  idDpOperation,
});

export const folderCleanMoeValue = (idDpOperation: number): FolderFoldercleanMoeValue => ({
  type: FOLDER_CLEAN_MOE_VALUE,
  idDpOperation,
});

export const fetchFolder = (idDpOperation: number): ThunkAction => async (dispatch) => {
  dispatch(folderUpdateLoading(idDpOperation));

  try {
    const res = await rest(`${API_PATH}actions/${idDpOperation}`);

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
  idDpFile,
}: {
  folderId: number;
  checkPointId: number;
  idDpFile: number;
}): ThunkAction => async (dispatch, getState) => {
  const checkPoint = getState().entities.checkPoints[checkPointId];
  const prevValue = checkPoint ? checkPoint.pivot.valide : 0;

  const dispatchError = () => {
    addMessageToQueue({
      duration: 2500,
      type: 'error',
      message: 'Erreur pendant la mise à jout du point de controle',
    });
    dispatch(folderUpdateCheckPointError({ folderId, checkPointId, prevValue }));
  };

  dispatch(folderUpdateCheckPointLoading({ folderId, checkPointId, prevValue }));

  try {
    const result = await rest(`${API_PATH}actions/${folderId}/controles/${checkPointId}`, {
      method: 'put',
      body: JSON.stringify({
        valide: prevValue === 1 ? 0 : 1,
        id_dp_file: idDpFile,
      }),
    });

    if (result.status === 200) {
      const json: FolderUpdateCheckPointResponse = await result.json();

      if (json.status === 'success') {
        const jsonStatusCode = idx(json, _ => _.statut_actuel[0].code_statut);
        const statusCode = typeof jsonStatusCode === 'number' ? jsonStatusCode : null;
        dispatch(
          folderUpdateCheckPointLoaded({
            folderId,
            checkPointId,
            idDpFile,
            statusCode,
          }),
        );
      } else {
        dispatchError();
      }
    } else {
      dispatchError();
    }
  } catch (error) {
    captureException(error);
    dispatchError();
  }
};

export const folderUpdateMoaLoading = (idDpOperation: number): FolderFolderUpdateMoaLoading => ({
  type: FOLDER_UPDATE_MOA_LOADING,
  idDpOperation,
});

export const folderUpdateMoaLoaded = (
  idDpOperation: number,
  iddossierprime: number,
  values: { [index: string]: string },
): FolderFolderUpdateMoaLoaded & FoldersUpdateMoaLoaded => ({
  type: FOLDER_UPDATE_MOA_LOADED,
  idDpOperation,
  id_dossierprime: iddossierprime,
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
    const pending = getState().views.folder.pending[idDpOperation];

    if (!pending) throw new Error('Pending is missing for MOa update');
    const values = pending.moa || {};

    dispatch(folderUpdateMoaLoading(idDpOperation));

    const res = await rest(`${API_PATH}dossierprimes/${idDossierPrime}`, {
      method: 'put',
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

export const folderUpdateMoeLoading = (idDpOperation: number): FolderFolderUpdateMoeLoading => ({
  type: FOLDER_UPDATE_MOE_LOADING,
  idDpOperation,
});

export const folderUpdateMoeLoaded = (
  idDpOperation: number,
  iddossierprime: number,
  values: { [index: string]: string },
): FolderFolderUpdateMoeLoaded & FoldersUpdateMoeLoaded => ({
  type: FOLDER_UPDATE_MOE_LOADED,
  idDpOperation,
  id_dossierprime: iddossierprime,
  values,
});

export const folderUpdateMoeError = (idDpOperation: number): FolderFolderUpdateMoeError => ({
  type: FOLDER_UPDATE_MOE_ERROR,
  idDpOperation,
});

export const updateMoeValues = (
  idDossierPrime: number,
  idDpOperation: number,
): ThunkAction => async (dispatch, getState) => {
  try {
    const pending = getState().views.folder.pending[idDpOperation];

    if (!pending) throw new Error('Pending is missing for MOE update');
    const values = pending.moe || {};

    dispatch(folderUpdateMoeLoading(idDpOperation));

    const res = await rest(`${API_PATH}dossierprimes/${idDossierPrime}`, {
      method: 'put',
      body: JSON.stringify(values),
    });

    if (res.status === 200) {
      addMessageToQueue({
        duration: 2500,
        type: 'info',
        message: 'Les infos du MOE ont étaient mise à jour',
      });
      dispatch(folderUpdateMoeLoaded(idDpOperation, idDossierPrime, values));
    } else {
      addMessageToQueue({
        duration: 4500,
        type: 'error',
        message: 'Erreur pendant la mise à jour des infos du MOE',
      });
      dispatch(folderUpdateMoeError(idDpOperation));
    }
  } catch (error) {
    addMessageToQueue({
      duration: 4500,
      type: 'error',
      message: 'Erreur pendant la mise à jour des infos du MOE',
    });
    dispatch(folderUpdateMoeError(idDpOperation));
  }
};

const folderFileLitigeLoading = (
  idDpOperation: number,
  idDpFile: number,
): FolderFolderLitigeLoading => ({
  type: FOLDER_FILE_LITIGE_LOADING,
  idDpOperation,
  idDpFile,
});

const folderFileLitigeLoaded = (
  idDpOperation: number,
  statusCode: number,
  idDpFile: number,
): FolderFolderLitigeLoaded & FileLitigeLoaded => ({
  type: FOLDER_FILE_LITIGE_LOADED,
  idDpOperation,
  idDpFile,
  statusCode,
});

const folderFileLitigeError = (
  idDpOperation: number,
  idDpFile: number,
): FolderFolderLitigeError => ({
  type: FOLDER_FILE_LITIGE_ERROR,
  idDpOperation,
  idDpFile,
});

export const folderFileInLitige = (
  idDpOperation: number,
  idDpFile: number,
): ThunkAction => async (dispatch) => {
  const dispatchError = () => {
    addMessageToQueue({
      duration: 3000,
      message: 'Erreur pendant la mise en litige du document',
      type: 'error',
    });
    dispatch(folderFileLitigeError(idDpOperation, idDpFile));
  };

  try {
    dispatch(folderFileLitigeLoading(idDpOperation, idDpFile));

    const result = await rest(`${API_PATH}setlitige/${idDpFile}`, { method: 'put' });

    if (result.status === 200) {
      const json: FolderFileLitigeResponse = await result.json();
      if (json.status === 'success') {
        const statutFile = idx(json, _ => _.statut_file[0].code_statut);

        if (statutFile) {
          dispatch(folderFileLitigeLoaded(idDpOperation, statutFile, idDpFile));
        } else {
          dispatchError();
        }
      } else {
        dispatchError();
      }
    } else {
      dispatchError();
    }
  } catch (error) {
    captureException(error);
    dispatchError();
  }
};

type FolderEndingLoading = (idDpOperation: number) => FolderFolderEndingLoading;

const folderEndingLoading: FolderEndingLoading = idDpOperation => ({
  type: FOLDER_ENDING_LOADING,
  idDpOperation,
});

type FolderEndingLoaded = (
  idDpOperation: number,
  status: OperationStatus
) => FolderFolderEndingLoaded & OperationsFolderEndingLoaded;

const folderEndingLoaded: FolderEndingLoaded = (idDpOperation, status) => ({
  type: FOLDER_ENDING_LOADED,
  idDpOperation,
  status,
});

type FolderEndingError = (idDpOperation: number) => FolderFolderEndingError;

const folderEndingError: FolderEndingError = idDpOperation => ({
  type: FOLDER_ENDING_ERROR,
  idDpOperation,
});

type FolderEnding = (idDpOperation: number) => ThunkAction;

export const folderEnding: FolderEnding = idDpOperation => async (dispatch) => {
  const dispatchError = () => {
    addMessageToQueue({
      duration: 3000,
      message: "Erreur pendant le traitement de validation de l'opération",
      type: 'error',
    });
    dispatch(folderEndingError(idDpOperation));
  };

  try {
    dispatch(folderEndingLoading(idDpOperation));

    const result = await rest(`${API_PATH}actions/${idDpOperation}/terminerinstruction`, {
      method: 'put',
    });

    if (result.status === 200) {
      const json: FolderEndingResponse = await result.json();

      if (json.status === 'success') {
        const [status] = json.statut_action;
        dispatch(folderEndingLoaded(idDpOperation, status));
      } else {
        dispatchError();
      }
    } else {
      dispatchError();
    }
  } catch (error) {
    captureException(error);
    dispatchError();
  }
};
