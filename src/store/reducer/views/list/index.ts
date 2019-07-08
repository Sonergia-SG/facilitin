import { ListState, ListAction, Tab } from './type';

import {
  LIST_LOADING,
  LIST_LOADED,
  LIST_ERROR,
  LIST_CHANGE_TAB,
  LIST_CHANGE_SEARCH,
  LIST_PAGE_UPDATE,
  LIST_PAGE_SIZE_UPDATE,
  LIST_SORTED_UPDATE,
  INIT,
  LOGOUT,
} from '../../../types';

const initialState = {
  selectedTab: 2,
  pageSize: 10,
  search: '',
  tab: {
    [Tab.TODO]: {
      page: 0,
      data: [],
      sorted: [],
      loading: false,
    },
    [Tab.INCOMPLETE]: {
      page: 0,
      data: [],
      sorted: [],
      loading: false,
    },
    [Tab.REJECTED]: {
      page: 0,
      data: [],
      sorted: [],
      loading: false,
    },
    [Tab.VALID]: {
      page: 0,
      data: [],
      sorted: [],
      loading: false,
    },
  },
};

const list = (state: ListState = initialState, action: ListAction): ListState => {
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
    case LIST_PAGE_UPDATE:
      return {
        ...state,
        tab: {
          ...state.tab,
          [state.selectedTab]: {
            ...state.tab[state.selectedTab],
            page: action.page,
          },
        },
      };
    case LIST_PAGE_SIZE_UPDATE:
      return {
        ...state,
        pageSize: action.pageSize,
      };
    case LIST_SORTED_UPDATE:
      return {
        ...state,
        tab: {
          ...state.tab,
          [state.selectedTab]: {
            ...state.tab[state.selectedTab],
            sorted: action.sorted,
          },
        },
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default list;
