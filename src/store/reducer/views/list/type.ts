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

import { Normalized } from '../../entities/types';

export interface Sorted {
  id: string;
  desc: boolean;
}

export enum Tab {
  TODO = 0,
  INCOMPLETE = 1,
  REJECTED = 2,
  VALID = 3,
}

export interface TabState {
  page: Tab;
  data: Array<number>;
  sorted: Array<Sorted>;
  loading: boolean;
}

export interface ListState {
  selectedTab: Tab;
  pageSize: Tab;
  search: string;
  tab: {
    0: TabState;
    1: TabState;
    2: TabState;
    3: TabState;
  };
}

export interface ListListLoadingAction {
  type: typeof LIST_LOADING;
  tab: Tab;
}

export interface ListListLoadedNormalized {
  result: {
    values: Array<number>;
  };
}

export interface ListListLoadedAction {
  type: typeof LIST_LOADED;
  tab: Tab;
  normalized: ListListLoadedNormalized;
}

export interface ListListErrorAction {
  type: typeof LIST_ERROR;
  tab: Tab;
}

export interface ListListChangeSearchAction {
  type: typeof LIST_CHANGE_SEARCH;
  search: string;
}

export interface ListListChangeTabAction {
  type: typeof LIST_CHANGE_TAB;
  tab: number;
}

export interface ListListChangePageAction {
  type: typeof LIST_PAGE_UPDATE;
  page: number;
}

export interface ListListPageSizeAction {
  type: typeof LIST_PAGE_SIZE_UPDATE;
  pageSize: number;
}

export interface ListListSortedAction {
  type: typeof LIST_SORTED_UPDATE;
  sorted: Sorted;
}

export interface ListLogoutAction {
  type: typeof LOGOUT;
}

export interface ListInitAction {
  type: typeof INIT;
}

export type ListAction = | ListListLoadingAction
  | ListListLoadedAction
  | ListListErrorAction
  | ListListChangeSearchAction
  | ListListChangeTabAction
  | ListListChangePageAction
  | ListListPageSizeAction
  | ListListSortedAction
  | ListLogoutAction
  | ListInitAction;
