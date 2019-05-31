import { LIST_LOADED } from '../../types';

const initialState = {
  folders: {},
  documents: {},
  moa: {},
  moe: {},
  travaux: {},
};

const entities = (state = initialState, action) => {
  switch (action.type) {
    case LIST_LOADED:
      return {
        ...state,
        folders: {
          ...state.folders,
          ...action.normalized.entities.folders,
        },
      };
    default:
      return state;
  }
};

export default entities;
