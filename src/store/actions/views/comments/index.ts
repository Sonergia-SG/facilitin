import { normalize } from 'normalizr';
import { ThunkAction } from '../..';
import {
  COMMENTS_LIST_LOADING,
  COMMENTS_LIST_LOADED,
  COMMENTS_LIST_ERROR,
  UPDATE_NEW_COMMENT_MESSAGE,
  COMMENTS_POST_COMMENT_LOADING,
  COMMENTS_POST_COMMENT_ERROR,
  COMMENTS_POST_COMMENT_LOADED,
} from '../../../types';
import {
  CommentsListLoadingAction,
  CommentsListLoadedAction,
  CommentsListErrorAction,
  CommentsUpdateNewMessage,
  CommentsPostCommentLoading,
  CommentsPostCommentLoaded,
  CommentsPostCommentError,
} from '../../../reducer/views/comments/types';
import { CommentFull, Entities } from '../../../reducer/entities/types';
import captureException from '../../../../tools/errorReporting/captureException';
import rest from '../../../../tools/rest';
import { API_PATH } from '../../../../variables';
import { comment } from '../../../reducer/entities/schema';
import { addMessageToQueue } from '../../../../components/Alert';

export interface CommentsLoadedNormalized {
  entities: Entities;
  result: [number];
}

export const commentsLoading = (idDpFolder: number): CommentsListLoadingAction => ({
  type: COMMENTS_LIST_LOADING,
  idDpFolder,
});

export const commentsLoaded = (
  idDpFolder: number,
  normalized: CommentsLoadedNormalized,
): CommentsListLoadedAction => ({
  type: COMMENTS_LIST_LOADED,
  idDpFolder,
  normalized,
});

export const commentsError = (idDpFolder: number): CommentsListErrorAction => ({
  type: COMMENTS_LIST_ERROR,
  idDpFolder,
});

export const loadComments = (
  idDpFolder: number,
  idDossierprime: number,
): ThunkAction => async (dispatch) => {
  dispatch(commentsLoading(idDpFolder));

  try {
    const result = await rest(
      `${API_PATH}actions/${idDpFolder}/commentaires?id_dossierprime=${idDossierprime}`,
    );

    if (result.status === 200) {
      interface JSON {
        status: 'success' | 'fail';
        value: Array<CommentFull>;
      }
      const json: JSON = await result.json();

      if (json.value.length > 0) {
        const normalized: CommentsLoadedNormalized = normalize(json.value, [comment]);
        dispatch(commentsLoaded(idDpFolder, normalized));
      } else {
        dispatch(commentsError(idDpFolder));
      }
    } else {
      dispatch(commentsError(idDpFolder));
    }
  } catch (error) {
    captureException(error);
    dispatch(commentsError(idDpFolder));
  }
};

export const updateNewCommentMessage = (
  message: string,
  idDpFolder: number,
): CommentsUpdateNewMessage => ({
  type: UPDATE_NEW_COMMENT_MESSAGE,
  message,
  idDpFolder,
});

export const commentsPostLoading = (idDpFolder: number): CommentsPostCommentLoading => ({
  type: COMMENTS_POST_COMMENT_LOADING,
  idDpFolder,
});

export const commentsPostLoaded = (idDpFolder: number): CommentsPostCommentLoaded => ({
  type: COMMENTS_POST_COMMENT_LOADED,
  idDpFolder,
});

export const commentsPostError = (idDpFolder: number): CommentsPostCommentError => ({
  type: COMMENTS_POST_COMMENT_ERROR,
  idDpFolder,
});

export const postComment = (
  idDpFolder: number,
  idDossierprime: number,
): ThunkAction => async (dispatch, getState) => {
  dispatch(commentsPostLoading(idDpFolder));

  try {
    const byFolder = getState().views.comments.byFolders[idDpFolder];
    if (!byFolder) throw new Error('Missing by folder');

    const { pending } = getState().views.comments.byFolders[idDpFolder];

    const result = await rest(
      `${API_PATH}actions/${idDpFolder}/commentaires`,
      {
        method: 'post',
        body: JSON.stringify({
          id_dossier: idDossierprime,
          message: pending.newMessage,
        }),
      },
    );

    if (result.status === 200) {
      dispatch(commentsPostLoaded(idDpFolder));

      dispatch(loadComments(idDpFolder, idDossierprime));
    } else {
      addMessageToQueue({
        duration: 3000,
        message: 'Error during message post',
        type: 'error',
      });
      dispatch(commentsPostError(idDpFolder));
    }
  } catch (error) {
    captureException(error);
    addMessageToQueue({
      duration: 3000,
      message: 'Error during message post',
      type: 'error',
    });
    dispatch(commentsPostError(idDpFolder));
  }
};
