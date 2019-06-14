import {
  INIT,
  COMMENTS_LIST_LOADING,
  COMMENTS_LIST_LOADED,
  COMMENTS_LIST_ERROR,
} from '../../../types';
import { CommentsLoadedNormalized } from '../../../actions/views/comments';

export interface CommentsByFoldersPending {
  newMessage: string;
  loading: boolean;
}

export interface CommentsByFolders {
  pending: CommentsByFoldersPending;
  comments: Array<number>;
}

export interface CommentsState {
  byFolders: {
    [index: number]: CommentsByFolders;
  }
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

export type CommentsAction = | CommentsIniAction
  | CommentsListLoadingAction
  | CommentsListLoadedAction
  | CommentsListErrorAction;
