import {
  INIT,
  COMMENTS_LIST_LOADING,
  COMMENTS_LIST_LOADED,
  COMMENTS_LIST_ERROR,
  UPDATE_NEW_COMMENT_MESSAGE,
  COMMENTS_POST_COMMENT_LOADING,
  COMMENTS_POST_COMMENT_LOADED,
  COMMENTS_POST_COMMENT_ERROR,
} from '../../../types';
import { CommentsLoadedNormalized } from '../../../actions/views/comments';

export interface CommentsByFoldersPending {
  newMessage: string;
  loading: boolean;
  postLoading: boolean;
}

export interface CommentsByFolders {
  pending: CommentsByFoldersPending;
  comments: Array<number>;
}

export interface CommentsState {
  byFolders: {
    [index: number]: CommentsByFolders;
  };
}

interface CommentsIniAction {
  type: typeof INIT;
}

export interface CommentsListLoadingAction {
  type: typeof COMMENTS_LIST_LOADING;
  idDpFolder: number;
}

export interface CommentsListLoadedAction {
  type: typeof COMMENTS_LIST_LOADED;
  idDpFolder: number;
  normalized: CommentsLoadedNormalized;
}

export interface CommentsListErrorAction {
  type: typeof COMMENTS_LIST_ERROR;
  idDpFolder: number;
}

export interface CommentsUpdateNewMessage {
  type: typeof UPDATE_NEW_COMMENT_MESSAGE;
  message: string;
  idDpFolder: number;
}

export interface CommentsPostCommentLoading {
  type: typeof COMMENTS_POST_COMMENT_LOADING;
  idDpFolder: number;
}

export interface CommentsPostCommentLoaded {
  type: typeof COMMENTS_POST_COMMENT_LOADED;
  idDpFolder: number;
}

export interface CommentsPostCommentError {
  type: typeof COMMENTS_POST_COMMENT_ERROR;
  idDpFolder: number;
}

export type CommentsAction = | CommentsIniAction
| CommentsListLoadingAction
| CommentsListLoadedAction
| CommentsListErrorAction
| CommentsUpdateNewMessage
| CommentsPostCommentLoading
| CommentsPostCommentLoaded
| CommentsPostCommentError;
