import { normalize } from 'normalizr';

import idx from 'idx';
import { addMessageToQueue } from '../../../../components/Alert';
import captureException from '../../../../tools/errorReporting/captureException';

import { API_PATH } from '../../../../variables';

import {
  FolderEndingResponse,
  FolderUpdateCheckPointResponse,
  FolderEndingErrorResponse,
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
  FOLDER_ENDING_LOADING,
  FOLDER_ENDING_LOADED,
  FOLDER_ENDING_ERROR,
  FOLDER_CLEAN_MOE_VALUE,
  FOLDER_UPDATE_MOE_LOADING,
  FOLDER_UPDATE_MOE_ERROR,
  FOLDER_UPDATE_MOE_LOADED,
  FOLDER_FILE_UPDATE_LOADING,
  FOLDER_FILE_UPDATE_LOADED,
  FOLDER_FILE_UPDATE_ERROR,
  FOLDER_UPDATE_SITE_VALUE,
  FOLDER_CLEAN_SITE_VALUE,
  FOLDER_UPDATE_SITE_LOADING,
  FOLDER_UPDATE_SITE_LOADED,
  FOLDER_UPDATE_SITE_ERROR,
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
  FolderFolderEndingLoading,
  FolderFolderEndingLoaded,
  FolderFolderEndingError,
  FolderFolderUpdateMoeLoaded,
  FolderFolderUpdateMoeError,
  FolderFolderUpdateMoeLoading,
  FolderFolderUpdateFileLoading,
  FolderFolderUpdateFileLoaded,
  FolderFolderUpdateFileError,
  FolderFolderUpdateSiteValue,
  FolderFoldercleanSiteValue,
  FolderFolderUpdateSiteLoading,
  FolderFolderUpdateSiteLoaded,
  FolderFolderUpdateSiteError,
} from '../../../reducer/views/folder/types';
import { ListListLoadedNormalized } from '../../../reducer/views/list/type';
import {
  CheckPointsFolderUpdateCheckpointLoadingAction,
  CheckPointsFolderUpdateChekpointLoadedAction,
  CheckPointsFolderUpdateCheckpointErrorAction,
  FilesFolcerCheckPointLoaded,
  FileStatus,
  OperationsUpdateSiteLoadedAction,
  OperationsUpdateMoaLoadedAction,
  OperationsUpdateMoeLoadedAction,
} from '../../../reducer/entities/types';
import rest from '../../../../tools/rest';
import { FormDef } from '../../../../components/Folder/Left/SecondaryData/types';
import populateValues from './populateValues';

interface FolderUpdateCheckPointLoadingParams {
  folderId: number;
  checkPointId: number;
  idDpFile: number;
  prevValue: 0 | 1 | -1;
  newValue: 0 | 1;
}

export const folderUpdateCheckPointLoading = ({
  folderId,
  checkPointId,
  prevValue,
  newValue,
  idDpFile,
}: FolderUpdateCheckPointLoadingParams): FolderFolderUpdateCheckpointLoadingAction &
CheckPointsFolderUpdateCheckpointLoadingAction => ({
  type: FOLDER_UPDATE_CHECK_POINT_LOADING,
  folderId,
  checkPointId,
  prevValue,
  newValue,
  idDpFile,
});

interface FolderUpdateCheckPointLoadedParams {
  folderId: number;
  checkPointId: number;
  statusCode: FileStatus | null;
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
  idDpFile: number;
  prevValue: 0 | 1 | -1;
}

export const folderUpdateCheckPointError = ({
  folderId,
  checkPointId,
  prevValue,
  idDpFile,
}: FolderUpdateCheckPointErrorParams):
| FolderFolderUpdateCheckpointErrorAction
| CheckPointsFolderUpdateCheckpointErrorAction => ({
  type: FOLDER_UPDATE_CHECK_POINT_ERROR,
  folderId,
  checkPointId,
  idDpFile,
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

export const folderUpdateSiteValue = (
  idDpOperation: number,
  key: string,
  value: string | null,
): FolderFolderUpdateSiteValue => ({
  type: FOLDER_UPDATE_SITE_VALUE,
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

export const folderCleanSiteValue = (idDpOperation: number): FolderFoldercleanSiteValue => ({
  type: FOLDER_CLEAN_SITE_VALUE,
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
  newValue,
}: {
  folderId: number;
  checkPointId: number;
  idDpFile: number;
  newValue: 0 | 1;
}): ThunkAction => async (dispatch, getState) => {
  const checkPoint = getState().entities.checkPoints[`${checkPointId}_${idDpFile}`];
  const prevValue = checkPoint ? checkPoint.pivot.valide : 0;

  const dispatchError = () => {
    addMessageToQueue({
      duration: 2500,
      type: 'error',
      message: 'Erreur pendant la mise à jour du point de contrôle',
    });
    dispatch(
      folderUpdateCheckPointError({
        folderId,
        idDpFile,
        checkPointId,
        prevValue,
      }),
    );
  };

  dispatch(
    folderUpdateCheckPointLoading({
      folderId,
      idDpFile,
      checkPointId,
      prevValue,
      newValue,
    }),
  );

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
  values: Array<FormDef>,
): FolderFolderUpdateMoaLoaded & OperationsUpdateMoaLoadedAction => ({
  type: FOLDER_UPDATE_MOA_LOADED,
  idDpOperation,
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
    const oldValues = getState().entities.operations[idDpOperation].forms.moa;

    if (!pending) throw new Error('Pending is missing for MOa update');
    const values = populateValues(oldValues, pending.moa || {});

    dispatch(folderUpdateMoaLoading(idDpOperation));

    const res = await rest(`${API_PATH}dossierprimes/${idDossierPrime}`, {
      method: 'put',
      body: JSON.stringify(pending.moa || {}),
    });

    if (res.status === 200) {
      addMessageToQueue({
        duration: 2500,
        type: 'info',
        message: 'Les infos du MOA ont étaient mise à jour',
      });
      dispatch(folderUpdateMoaLoaded(idDpOperation, values));
    } else {
      addMessageToQueue({
        duration: 4500,
        type: 'error',
        message: 'Erreur pendant la mise à jour des infos du MOA',
      });
      dispatch(folderUpdateMoaError(idDpOperation));
    }
  } catch (error) {
    captureException(error);

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
  values: Array<FormDef>,
): FolderFolderUpdateMoeLoaded & OperationsUpdateMoeLoadedAction => ({
  type: FOLDER_UPDATE_MOE_LOADED,
  idDpOperation,
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
    const oldValues = getState().entities.operations[idDpOperation].forms.moe;

    if (!pending) throw new Error('Pending is missing for MOE update');
    const values = populateValues(oldValues, pending.moe || {});

    dispatch(folderUpdateMoeLoading(idDpOperation));

    const res = await rest(`${API_PATH}dossierprimes/${idDossierPrime}`, {
      method: 'put',
      body: JSON.stringify(pending.moe || {}),
    });

    if (res.status === 200) {
      addMessageToQueue({
        duration: 2500,
        type: 'info',
        message: 'Les infos du MOE ont étaient mise à jour',
      });
      dispatch(folderUpdateMoeLoaded(idDpOperation, values));
    } else {
      addMessageToQueue({
        duration: 4500,
        type: 'error',
        message: 'Erreur pendant la mise à jour des infos du MOE',
      });
      dispatch(folderUpdateMoeError(idDpOperation));
    }
  } catch (error) {
    captureException(error);

    addMessageToQueue({
      duration: 4500,
      type: 'error',
      message: 'Erreur pendant la mise à jour des infos du MOE',
    });
    dispatch(folderUpdateMoeError(idDpOperation));
  }
};

export const folderUpdateSiteLoading = (idDpOperation: number): FolderFolderUpdateSiteLoading => ({
  type: FOLDER_UPDATE_SITE_LOADING,
  idDpOperation,
});

export const folderUpdateSiteLoaded = (
  idDpOperation: number,
  values: Array<FormDef>,
): FolderFolderUpdateSiteLoaded & OperationsUpdateSiteLoadedAction => ({
  type: FOLDER_UPDATE_SITE_LOADED,
  idDpOperation,
  values,
});

export const folderUpdateSiteError = (idDpOperation: number): FolderFolderUpdateSiteError => ({
  type: FOLDER_UPDATE_SITE_ERROR,
  idDpOperation,
});

export const updateSiteValues = (
  idDossierPrime: number,
  idDpOperation: number,
): ThunkAction => async (dispatch, getState) => {
  try {
    const pending = getState().views.folder.pending[idDpOperation];
    const oldValues = getState().entities.operations[idDpOperation].forms.site;

    if (!pending) throw new Error('Pending is missing for MOE update');
    const values = populateValues(oldValues, pending.site || {});

    dispatch(folderUpdateSiteLoading(idDpOperation));

    const res = await rest(`${API_PATH}dossierprimes/${idDossierPrime}`, {
      method: 'put',
      body: JSON.stringify(pending.site || {}),
    });

    if (res.status === 200) {
      addMessageToQueue({
        duration: 2500,
        type: 'info',
        message: 'Les infos du MOE ont étaient mise à jour',
      });
      dispatch(folderUpdateSiteLoaded(idDpOperation, values));
    } else {
      addMessageToQueue({
        duration: 4500,
        type: 'error',
        message: 'Erreur pendant la mise à jour des infos du MOE',
      });
      dispatch(folderUpdateSiteError(idDpOperation));
    }
  } catch (error) {
    captureException(error);

    addMessageToQueue({
      duration: 4500,
      type: 'error',
      message: 'Erreur pendant la mise à jour des infos du MOE',
    });
    dispatch(folderUpdateSiteError(idDpOperation));
  }
};

type FolderEndingLoading = (idDpOperation: number) => FolderFolderEndingLoading;

const folderEndingLoading: FolderEndingLoading = idDpOperation => ({
  type: FOLDER_ENDING_LOADING,
  idDpOperation,
});

type FolderEndingLoaded = (idDpOperation: number) => FolderFolderEndingLoaded;

const folderEndingLoaded: FolderEndingLoaded = idDpOperation => ({
  type: FOLDER_ENDING_LOADED,
  idDpOperation,
});

type FolderEndingError = (idDpOperation: number) => FolderFolderEndingError;

const folderEndingError: FolderEndingError = idDpOperation => ({
  type: FOLDER_ENDING_ERROR,
  idDpOperation,
});

type FolderEnding = (idDpOperation: number) => ThunkAction;

export const folderEnding: FolderEnding = idDpOperation => async (dispatch) => {
  const dispatchError = (code?: number | null) => {
    switch (code) {
      case 1:
        addMessageToQueue({
          duration: 5000,
          message: "Catégories de documents manquants ,l'instruction ne peut être terminée",
          type: 'error',
        });
        break;
      case 2:
        addMessageToQueue({
          duration: 5000,
          message: "Fichiers manquants, l'instruction ne peut être terminée",
          type: 'error',
        });
        break;
      case 3:
        addMessageToQueue({
          duration: 5000,
          message: "L'action est en cours d'instruction et ne peut être terminée",
          type: 'error',
        });
        break;
      default:
        addMessageToQueue({
          duration: 3000,
          message: "Erreur pendant le traitement de validation de l'opération",
          type: 'error',
        });
        break;
    }
    dispatch(folderEndingError(idDpOperation));
  };

  try {
    dispatch(folderEndingLoading(idDpOperation));

    const result = await rest(`${API_PATH}actions/${idDpOperation}/terminerinstruction`, {
      method: 'put',
    });

    switch (result.status) {
      case 200:
        {
          const json: FolderEndingResponse = await result.json();

          if (json.status === 'success') {
            dispatch(folderEndingLoaded(idDpOperation));
            dispatch(fetchFolder(idDpOperation));
          } else {
            dispatchError();
          }
        }
        break;
      case 400: {
        const json: FolderEndingErrorResponse = await result.json();
        dispatchError(idx(json, _ => _.error.code));
        break;
      }
      default:
        dispatchError();
        break;
    }
  } catch (error) {
    captureException(error);
    dispatchError();
  }
};

type FolderUpdateFileLoading = (
  idDpOperation: number,
  idDpFile: number
) => FolderFolderUpdateFileLoading;

export const folderUpdateFileLoading: FolderUpdateFileLoading = (idDpOperation, idDpFile) => ({
  type: FOLDER_FILE_UPDATE_LOADING,
  idDpOperation,
  idDpFile,
});

type FolderUpdateFileLoaded = (
  idDpOperation: number,
  idDpFile: number
) => FolderFolderUpdateFileLoaded;

export const folderUpdateFileLoaded: FolderUpdateFileLoaded = (idDpOperation, idDpFile) => ({
  type: FOLDER_FILE_UPDATE_LOADED,
  idDpOperation,
  idDpFile,
});

type FolderUpdateFileError = (
  idDpOperation: number,
  idDpFile: number,
) => FolderFolderUpdateFileError;

export const folderUpdateFileError: FolderUpdateFileError = (idDpOperation, idDpFile) => ({
  type: FOLDER_FILE_UPDATE_ERROR,
  idDpOperation,
  idDpFile,
});

type UploadFile = (
  idDpOperation: number,
  idDpFile: number,
  file: File,
  base64: string
) => ThunkAction;

export const uploadFile: UploadFile = (
  idDpOperation,
  idDpFile,
  file,
  base64,
) => async (dispatch) => {
  const dispatchError = () => {
    addMessageToQueue({
      duration: 3000,
      message: 'Erreur pendant la mise à jour du fichier',
      type: 'error',
    });
    dispatch(folderUpdateFileError(idDpOperation, idDpFile));
  };

  try {
    dispatch(folderUpdateFileLoading(idDpOperation, idDpFile));

    const result = await rest(`${API_PATH}uploadFile`, {
      method: 'put',
      body: JSON.stringify({
        id_dp_file: idDpFile,
        mimetype: file.type,
        filename: file.name,
        binarycontent: base64,
      }),
    });

    if (result.status === 200) {
      const j: { status: 'success' | 'fail' } = await result.json();

      if (j.status === 'success') {
        dispatch(folderUpdateFileLoaded(idDpOperation, idDpFile));
        dispatch(fetchFolder(idDpOperation));
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

export * from './folderFileEnding';
export * from './deleteFile';
