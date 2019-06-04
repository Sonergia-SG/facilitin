// @flow

import idx from 'idx';

import {
  FOLDER_LOADING, FOLDER_LOADED, FOLDER_ERROR, LOGOUT,
} from '../../../types';

export type FolderState = {
  pending: {
    [string]: {},
  },
};

export type FolderReducerActionFolderLoaded = {
  type: typeof FOLDER_LOADED,
  folderId: string,
};

export type FolderReducerActionFolderError = {
  type: typeof FOLDER_ERROR,
  folderId: string,
};

export type FolderReducerActionFolderLoading = {
  type: typeof FOLDER_LOADING,
  folderId: string,
};

type FolderReducerAction =
  | FolderReducerActionFolderLoaded
  | FolderReducerActionFolderError
  | FolderReducerActionFolderLoading;

type FolderReducer = (state: FolderState, action: FolderReducerAction) => FolderState;

const initialState: FolderState = {
  pending: {},
};

const folder: FolderReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLDER_LOADING:
      return {
        ...state,
        pending: {
          ...state.pending,
          [action.folderId]: {
            ...idx(state, _ => _.pending[action.folderId]),
            loading: true,
          },
        },
      };
    case FOLDER_ERROR:
    case FOLDER_LOADED:
      return {
        ...state,
        pending: {
          ...state.pending,
          [action.folderId]: {
            ...idx(state, _ => _.pending[action.folderId]),
            loading: false,
          },
        },
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default folder;
