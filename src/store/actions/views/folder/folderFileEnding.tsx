import idx from 'idx';

import { addMessageToQueue } from '../../../../components/Alert';
import captureException from '../../../../tools/errorReporting/captureException';

import { API_PATH } from '../../../../variables';

import { FolderFileEndingResponse } from './apiTypes';
import { FOLDER_FILE_ENDING_LOADING, FOLDER_FILE_ENDING_LOADED, FOLDER_FILE_ENDING_ERROR } from '../../../types';

import { ThunkAction } from '../..';
import { FolderFolderFileEndingLoading, FolderFolderFileEndingLoaded, FolderFolderFileEndingError } from '../../../reducer/views/folder/types';
import { FileStatus, FileEndingLoaded } from '../../../reducer/entities/types';
import rest from '../../../../tools/rest';

export const folderFileEndingLoading = (
  idDpOperation: number,
  idDpFile: number,
): FolderFolderFileEndingLoading => ({
  type: FOLDER_FILE_ENDING_LOADING,
  idDpOperation,
  idDpFile,
});

export const folderFileEndingLoaded = (
  idDpOperation: number,
  statusCode: FileStatus,
  idDpFile: number,
): FolderFolderFileEndingLoaded | FileEndingLoaded => ({
  type: FOLDER_FILE_ENDING_LOADED,
  idDpOperation,
  idDpFile,
  statusCode,
});

export const folderFileEndingError = (
  idDpOperation: number,
  idDpFile: number,
): FolderFolderFileEndingError => ({
  type: FOLDER_FILE_ENDING_ERROR,
  idDpOperation,
  idDpFile,
});

type allowedForcedStatus = 5 | 10 | 15

export const folderFileEnding = (
  idDpOperation: number,
  idDpFile: number,
  forceStatus?: allowedForcedStatus,
): ThunkAction => async (dispatch) => {
  const dispatchError = () => {
    addMessageToQueue({
      duration: 3000,
      message: 'Erreur pendant la validation du document',
      type: 'error',
    });
    dispatch(folderFileEndingError(idDpOperation, idDpFile));
  };

  try {
    dispatch(folderFileEndingLoading(idDpOperation, idDpFile));

    const status = typeof forceStatus === 'number' ? `/${forceStatus}` : '';
    const result = await rest(
      `${API_PATH}files/${idDpFile}/terminerdocument${status}`,
      { method: 'put' },
    );

    if (result.status === 200) {
      const json: FolderFileEndingResponse = await result.json();
      if (json.status !== 'fail') {
        const statutFile = idx(json, _ => _.statut.code);

        if (typeof statutFile === 'number' || typeof statutFile === 'string') {
          const safeStatus = typeof statutFile === 'string' ? parseInt(statutFile, 10) : statutFile;
          dispatch(folderFileEndingLoaded(idDpOperation, (safeStatus as FileStatus), idDpFile));
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
