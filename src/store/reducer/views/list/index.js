// @flow
/* eslint-disable no-useless-computed-key */
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

type ReactTableSorted = {
  id: string,
  desc: Boolean,
};

type Tab = 0 | 1 | 2 | 3;

export type ListState = {
  +selectedTab: Tab,
  +pageSize: number,
  +search: string,
  +tab: {
    +'0': {
      +page: number,
      +data: Array<number>,
      +sorted: Array<ReactTableSorted>,
      +loading: boolean,
    },
    +'1': {
      +page: number,
      +data: Array<number>,
      +sorted: Array<ReactTableSorted>,
      +loading: boolean,
    },
    +'2': {
      +page: number,
      +data: Array<number>,
      +sorted: Array<ReactTableSorted>,
      +loading: boolean,
    },
    +'3': {
      +page: number,
      +data: Array<number>,
      +sorted: Array<ReactTableSorted>,
      +loading: boolean,
    },
  },
};

type ListReducerActionListLoading = {
  type: typeof LIST_LOADING,
  tab: Tab,
};

type ListReducerActionListError = {
  type: typeof LIST_ERROR,
  tab: Tab,
};

type ListReducerActionListLoaded = {
  type: typeof LIST_LOADED,
  tab: number,
  normalized: {
    result: {
      values: {
        [string]: {},
      },
    },
  },
};

type ListReducerActionSearch = {
  type: typeof LIST_CHANGE_SEARCH,
  search: string,
};

type ListReducerActionChangeTab = {
  type: typeof LIST_CHANGE_TAB,
  tab: Tab,
};

type ListReducerActionPageUpdate = {
  type: typeof LIST_PAGE_UPDATE,
  page: number,
};

type ListReducerActionPageSizeUpdate = {
  type: typeof LIST_PAGE_SIZE_UPDATE,
  pageSize: number,
};

type ListReducerActionSortedUpdate = {
  type: typeof LIST_SORTED_UPDATE,
  sorted: ReactTableSorted,
};

type ListReducerAction =
  | ListReducerActionListLoading
  | ListReducerActionListError
  | ListReducerActionListLoaded
  | ListReducerActionSearch
  | ListReducerActionChangeTab
  | ListReducerActionPageUpdate
  | ListReducerActionPageSizeUpdate
  | ListReducerActionSortedUpdate;

type ListReducer = (state: ListState, action: ListReducerAction) => ListState;

const initialState: ListState = {
  selectedTab: 0,
  pageSize: 10,
  search: '',
  tab: {
    ['0']: {
      page: 0,
      data: [],
      sorted: [],
      loading: false,
    },
    ['1']: {
      page: 0,
      data: [],
      sorted: [],
      loading: false,
    },
    ['2']: {
      page: 0,
      data: [],
      sorted: [],
      loading: false,
    },
    ['3']: {
      page: 0,
      data: [],
      sorted: [],
      loading: false,
    },
  },
};

const list: ListReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT:
      return {
        ...state,
        search: '',
        tab: {
          ...state.tab,
          ['0']: {
            ...state.tab['0'],
            loading: false,
          },
          ['1']: {
            ...state.tab['1'],
            loading: false,
          },
          ['2']: {
            ...state.tab['2'],
            loading: false,
          },
          ['3']: {
            ...state.tab['3'],
            loading: false,
          },
        },
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
