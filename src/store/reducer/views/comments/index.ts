import idx from 'idx'

import { INIT, COMMENTS_LIST_LOADING, COMMENTS_LIST_LOADED, COMMENTS_LIST_ERROR } from '../../../types'
import { CommentsAction, CommentsState, CommentsByFolders } from './types';

const defaultState = {
  byFolders: {}
}

const newFolderState: CommentsByFolders = {
  pending: {
    newMessage: '',
    loading: false
  },
  comments: []
}

const getPrevFolder = (s: CommentsState, idDpFolder: number) => {
  const prevFolder = idx(s, _ => _.byFolders[idDpFolder])
  return prevFolder || newFolderState 
}

const comments = (state: CommentsState = defaultState, action: CommentsAction) => {
  switch (action.type) {
    case COMMENTS_LIST_LOADING: {
      const folderState = getPrevFolder(state, action.idDpFolder)
 
      return {
        ...state,
        byFolders: {
          ...state.byFolders,
          [action.idDpFolder]: {
            ...folderState,
            pending: {
              ...folderState.pending,
              loading: true,
            }
          }
        }
      }
    }
    case COMMENTS_LIST_LOADED: {
      const folderState = getPrevFolder(state, action.idDpFolder)

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
            comments: action.normalized.result
          }
        }
      }
    }
    case COMMENTS_LIST_ERROR: {
      const folderState = getPrevFolder(state, action.idDpFolder)

      return {
        ...state,
        byFolders: {
          ...state.byFolders,
          [action.idDpFolder]: {
            ...folderState,
            pending: {
              ...folderState.pending,
              loading: false,
            }
          }
        }
      }
    }
    case INIT:
    default:
      return state
  }
}

export default comments;
