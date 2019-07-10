import idx from 'idx';

import { addMessageToQueue } from '../../../../components/Alert';
import captureException from '../../../../tools/errorReporting/captureException';

import { API_PATH } from '../../../../variables';

import { FolderFileLitigeResponse } from './apiTypes';
import {
  FOLDER_FILE_LITIGE_LOADING,
  FOLDER_FILE_LITIGE_LOADED,
  FOLDER_FILE_LITIGE_ERROR,
} from '../../../types';

import { ThunkAction } from '../..';
import {
  FolderFolderLitigeLoading,
  FolderFolderLitigeLoaded,
  FolderFolderLitigeError,
} from '../../../reducer/views/folder/types';
import { FileLitigeLoaded, FileStatus } from '../../../reducer/entities/types';
import rest from '../../../../tools/rest';

export const folderFileLitigeLoading = (
  idDpOperation: number,
  idDpFile: number,
): FolderFolderLitigeLoading => ({
  type: FOLDER_FILE_LITIGE_LOADING,
  idDpOperation,
  idDpFile,
});

export const folderFileLitigeLoaded = (
  idDpOperation: number,
  statusCode: FileStatus,
  idDpFile: number,
): FolderFolderLitigeLoaded & FileLitigeLoaded => ({
  type: FOLDER_FILE_LITIGE_LOADED,
  idDpOperation,
  idDpFile,
  statusCode,
});

export const folderFileLitigeError = (
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
