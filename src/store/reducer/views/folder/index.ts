import idx from 'idx';

import { FolderState, FolderAction, FolderCheckPointStatus } from './types';

import {
  FOLDER_UPDATE_CHECK_POINT_LOADING,
  FOLDER_UPDATE_CHECK_POINT_LOADED,
  FOLDER_UPDATE_CHECK_POINT_ERROR,
  FOLDER_LOADING,
  FOLDER_LOADED,
  FOLDER_ERROR,
  LOGOUT,
  FOLDER_UPDATE_MOA_VALUE,
  FOLDER_CLEAN_MOA_VALUE,
} from '../../../types';

const initialState = {
  pending: {},
};

const folder = (state: FolderState = initialState, action: FolderAction): FolderState => {
  switch (action.type) {
    case FOLDER_LOADING:
      return {
        ...state,
        pending: {
          ...state.pending,
          [action.idDpOperation]: {
            ...idx(state, _ => _.pending[action.idDpOperation]),
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
          [action.idDpOperation]: {
            ...idx(state, _ => _.pending[action.idDpOperation]),
            loading: false,
          },
        },
      };
    case FOLDER_UPDATE_CHECK_POINT_LOADING:
      return {
        ...state,
        pending: {
          ...state.pending,
          [action.folderId]: {
            ...idx(state, _ => _.pending[action.folderId]),
            checkPoint: {
              ...idx(state, _ => _.pending[action.folderId].checkPoint),
              [action.checkPointId]: {
                ...idx(state, _ => _.pending[action.folderId].checkPoint[action.checkPointId]),
                status: FolderCheckPointStatus.SENDING,
                prevValue: action.prevValue,
              },
            },
          },
        },
      };
    case FOLDER_UPDATE_CHECK_POINT_LOADED:
      return {
        ...state,
        pending: {
          ...state.pending,
          [action.folderId]: {
            ...idx(state, _ => _.pending[action.folderId]),
            checkPoint: {
              ...idx(state, _ => _.pending[action.folderId].checkPoint),
              [action.checkPointId]: undefined,
            },
          },
        },
      };
    case FOLDER_UPDATE_CHECK_POINT_ERROR:
      return {
        ...state,
        pending: {
          ...state.pending,
          [action.folderId]: {
            ...idx(state, _ => _.pending[action.folderId]),
            checkPoint: {
              ...idx(state, _ => _.pending[action.folderId].checkPoint),
              [action.checkPointId]: {
                ...idx(state, _ => _.pending[action.folderId].checkPoint[action.checkPointId]),
                status: FolderCheckPointStatus.ERROR,
              },
            },
          },
        },
      };
    case FOLDER_UPDATE_MOA_VALUE:
      return {
        ...state,
        pending: {
          ...state.pending,
          [action.idDpOperation]: {
            ...idx(state, _ => _.pending[action.idDpOperation]),
            moa: {
              ...idx(state, _ => _.pending[action.idDpOperation].moa),
              [action.key]: action.value,
            },
          },
        },
      };
    case FOLDER_CLEAN_MOA_VALUE:
      return {
        ...state,
        pending: {
          ...state.pending,
          [action.idDpOperation]: undefined,
        },
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default folder;
