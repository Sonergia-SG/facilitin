import {
  LIST_LOADING,
  LIST_LOADED,
  LIST_ERROR,
  LIST_CHANGE_TAB,
  LIST_CHANGE_SEARCH,
  INIT,
  LOGOUT,
} from '../../../types';

const initialState = {
  selectedTab: 0,
  search: '',
  tab: {
    0: {
      data: [],
      loading: false,
    },
    1: {
      data: [],
      loading: false,
    },
    2: {
      data: [],
      loading: false,
    },
    3: {
      data: [],
      loading: false,
    },
  },
};

const list = (state = initialState, action) => {
  switch (action.type) {
    case INIT:
      return {
        ...state,
        search: '',
      };
    case LIST_LOADING:
      return {
        ...state,
        tab: {
          ...state.tab,
          [action.tab]: {
            ...state.tab[action.tab],
            loading: true,
          },
        },
      };
    case LIST_LOADED:
      return {
        ...state,
        tab: {
          ...state.tab,
          [action.tab]: {
            ...state.tab[action.tab],
            loading: false,
            data: action.normalized.result.values,
          },
        },
      };
    case LIST_ERROR:
      return {
        ...state,
        tab: {
          ...state.tab,
          [action.tab]: {
            ...state.tab[action.tab],
            loading: false,
          },
        },
      };
    case LIST_CHANGE_SEARCH:
      return {
        ...state,
        search: action.search,
      };
    case LIST_CHANGE_TAB:
      return {
        ...state,
        selectedTab: action.tab,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default list;
