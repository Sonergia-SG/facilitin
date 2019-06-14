import { ThunkAction } from '../../../actions'
import { COMMENTS_LIST_LOADING, COMMENTS_LIST_LOADED, COMMENTS_LIST_ERROR } from "../../../types";
import { CommentsListLoadingAction, CommentsListLoadedAction, CommentsListErrorAction } from "../../../reducer/views/comments/types";
import { CommentFull, Entities } from "../../../reducer/entities/types";
import captureException from '../../../../tools/errorReporting/captureException';
import rest from '../../../../tools/rest';
import { API_PATH } from '../../../../variables';
import { normalize } from 'normalizr';
import { comment } from '../../../reducer/entities/schema';

export interface CommentsLoadedNormalized {
  entities: Entities;
  result: [number];
}

export const commentsLoading = (idDpFolder: number): CommentsListLoadingAction => ({
  type: COMMENTS_LIST_LOADING,
  idDpFolder
})

export const commentsLoaded = (idDpFolder: number, normalized: CommentsLoadedNormalized): CommentsListLoadedAction => ({
  type: COMMENTS_LIST_LOADED,
  idDpFolder,
  normalized
})

export const commentsError = (idDpFolder: number): CommentsListErrorAction => ({
  type: COMMENTS_LIST_ERROR,
  idDpFolder,
})

export const loadComments = (idDpFolder: number, idDossierprime: number): ThunkAction => async (dispatch) => {
  dispatch(commentsLoading(idDpFolder))

  try {
    const result = await rest(`${API_PATH}actions/${idDpFolder}/commentaires?id_dossierprime=${idDossierprime}`)
    
    if (result.status === 200) {
      type JSON = {
        status: 'success' | 'fail',
        value: Array<CommentFull>
      }
      const json: JSON = await result.json()

      if (json.value.length > 0) {
        const normalized: CommentsLoadedNormalized = normalize(json.value, [comment])
        dispatch(commentsLoaded(idDpFolder, normalized))
      } else {
        dispatch(commentsError(idDpFolder))
      }
    } else {
      dispatch(commentsError(idDpFolder))
    }
  } catch (error) {
    captureException(error)
    dispatch(commentsError(idDpFolder))
  }
}
