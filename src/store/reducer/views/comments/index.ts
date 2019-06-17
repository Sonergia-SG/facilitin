import idx from 'idx';

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
import { CommentsAction, CommentsState, CommentsByFolders } from './types';

const defaultState = {
  byFolders: {},
};

const newFolderState: CommentsByFolders = {
  pending: {
    newMessage: '',
    loading: false,
    postLoading: false,
  },
  comments: [],
};

const getPrevFolder = (s: CommentsState, idDpFolder: number): CommentsByFolders => {
  const prevFolder = idx(s, _ => _.byFolders[idDpFolder]);
  return prevFolder || newFolderState;
};

const comments = (state: CommentsState = defaultState, action: CommentsAction) => {
  switch (action.type) {
    case COMMENTS_LIST_LOADING: {
      const folderState = getPrevFolder(state, action.idDpFolder);

      return {
        ...state,
        byFolders: {
          ...state.byFolders,
          [action.idDpFolder]: {
            ...folderState,
            pending: {
              ...folderState.pending,
              loading: true,
            },
          },
        },
      };
    }
    case COMMENTS_LIST_LOADED: {
      const folderState = getPrevFolder(state, action.idDpFolder);

      return {
        ...state,
        byFolders: {
          ...state.byFolders,
          [action.idDpFolder]: {
            ...folderState,
            pending: {
              ...folderState.pending,
              loading: false,
            },
            comments: action.normalized.result,
          },
        },
      };
    }
    case COMMENTS_LIST_ERROR: {
      const folderState = getPrevFolder(state, action.idDpFolder);

      return {
        ...state,
        byFolders: {
          ...state.byFolders,
          [action.idDpFolder]: {
            ...folderState,
            pending: {
              ...folderState.pending,
              loading: false,
            },
          },
        },
      };
    }
    case UPDATE_NEW_COMMENT_MESSAGE: {
      const folderState = getPrevFolder(state, action.idDpFolder);

      return {
        ...state,
        byFolders: {
          ...state.byFolders,
          [action.idDpFolder]: {
            ...folderState,
            pending: {
              ...folderState.pending,
              newMessage: action.message,
            },
          },
        },
      };
    }
    case COMMENTS_POST_COMMENT_LOADING: {
      const folderState = getPrevFolder(state, action.idDpFolder);

      return {
        ...state,
        byFolders: {
          ...state.byFolders,
          [action.idDpFolder]: {
            ...folderState,
            pending: {
              ...folderState.pending,
              postLoading: true,
            },
          },
        },
      };
    }
    case COMMENTS_POST_COMMENT_LOADED: {
      const folderState = getPrevFolder(state, action.idDpFolder);

      return {
        ...state,
        byFolders: {
          ...state.byFolders,
          [action.idDpFolder]: {
            ...folderState,
            pending: {
              ...folderState.pending,
              postLoading: false,
              newMessage: '',
            },
          },
        },
      };
    }
    case COMMENTS_POST_COMMENT_ERROR: {
      const folderState = getPrevFolder(state, action.idDpFolder);

      return {
        ...state,
        byFolders: {
          ...state.byFolders,
          [action.idDpFolder]: {
            ...folderState,
            pending: {
              ...folderState.pending,
              postLoading: false,
            },
          },
        },
      };
    }
    case INIT:
    default:
      return state;
  }
};

export default comments;
