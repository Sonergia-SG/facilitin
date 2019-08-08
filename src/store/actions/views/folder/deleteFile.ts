import {
  FOLDER_FILE_DELETE_LOADING,
  FOLDER_FILE_DELETE_LOADED,
  FOLDER_FILE_DELETE_ERROR,
} from '../../../types';
import { addMessageToQueue } from '../../../../components/Alert';
import rest from '../../../../tools/rest';
import { API_PATH } from '../../../../variables';
import { ThunkAction } from '../..';
import { fetchFolder } from '.';

export const folderFileDeleteLoading = () => ({
  type: FOLDER_FILE_DELETE_LOADING,
});

export const folderFileDeleteLoaded = () => ({
  type: FOLDER_FILE_DELETE_LOADED,
});

export const folderFileDeleteError = () => ({
  type: FOLDER_FILE_DELETE_ERROR,
});

type DeleteFile = (idFile: number, idDpOperation: number) => ThunkAction;

export const deleteFile: DeleteFile = (idFile, idDpOperation) => async (dispatch) => {
  const dispatchError = () => {
    addMessageToQueue({
      duration: 3000,
      message: 'Erreur pendant la suression du fichier',
      type: 'error',
    });
    dispatch(folderFileDeleteError());
  };

  dispatch(folderFileDeleteLoading());

  try {
    const result = await rest(`${API_PATH}files/${idFile}`, {
      method: 'DELETE',
    });

    if (result.status === 200) {
      dispatch(fetchFolder(idDpOperation));
    } else {
      dispatchError();
    }
  } catch (error) {
    dispatchError();
  }
};
