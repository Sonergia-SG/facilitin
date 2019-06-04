// @flow
import { normalize } from 'normalizr';

import {
  LIST_LOADING,
  LIST_LOADED,
  LIST_ERROR,
  LIST_CHANGE_TAB,
  LIST_CHANGE_SEARCH,
  LIST_PAGE_UPDATE,
  LIST_PAGE_SIZE_UPDATE,
  LIST_SORTED_UPDATE,
} from '../../../types';

import { API_PATH } from '../../../../variables';
import { folder } from '../../../reducer/entities/schema';

import capture from '../../../../tools/errorReporting/captureException';

import {
  type ListReducerActionListLoading,
  type Tab,
  type Normalized,
  type ListReducerActionListLoaded,
  type ListReducerActionChangeTab,
  type ListReducerActionListError,
  type ListReducerActionSearch,
  type ListReducerActionPageUpdate,
  type ListReducerActionPageSizeUpdate,
  type ReactTableSorted,
  type ListReducerActionSortedUpdate,
} from '../../../reducer/views/list';
import { type State } from '../../../reducer/index';

type ListLoading = (tab: Tab) => ListReducerActionListLoading;

export const listLoading: ListLoading = tab => ({
  type: LIST_LOADING,
  tab,
});

type ListLoaded = (normalized: Normalized, tab: Tab) => ListReducerActionListLoaded;

export const listLoaded: ListLoaded = (normalized, tab) => ({
  type: LIST_LOADED,
  normalized,
  tab,
});

type ListChangeTab = (tab: Tab) => ListReducerActionChangeTab;

export const listChangeTab: ListChangeTab = tab => ({
  type: LIST_CHANGE_TAB,
  tab,
});

type ListError = (tab: Tab) => ListReducerActionListError;

export const listError: ListError = tab => ({
  type: LIST_ERROR,
  tab,
});

type ListUpdateSearch = (search: string) => ListReducerActionSearch;

export const listUpdateSearch: ListUpdateSearch = search => ({
  type: LIST_CHANGE_SEARCH,
  search,
});

type ListUpdatePage = (page: number) => ListReducerActionPageUpdate;

export const listUpdatePage: ListUpdatePage = page => ({
  type: LIST_PAGE_UPDATE,
  page,
});

type ListUpdatePageSize = (pageSize: number) => ListReducerActionPageSizeUpdate;

export const listUpdatePageSize: ListUpdatePageSize = pageSize => ({
  type: LIST_PAGE_SIZE_UPDATE,
  pageSize,
});

type ListUpdateSorted = (sorted: ReactTableSorted) => ListReducerActionSortedUpdate;

export const listUpdateSorted: ListUpdateSorted = sorted => ({
  type: LIST_SORTED_UPDATE,
  sorted,
});

type Dispatch = mixed => void;

type GetState = () => State;

type LoadList = (toTab: Tab) => (dispatch: Dispatch, getState: GetState) => Promise<void>;

export const loadList: LoadList = toTab => async (dispatch, getState) => {
  const { list } = getState().views;
  const tab = toTab !== undefined ? toTab : list.selectedTab;
  try {
    const { loading } = list.tab[tab];
    const { apiKey } = getState().user;

    if (!loading && apiKey) {
      dispatch(listLoading(tab));

      if (toTab !== undefined && toTab !== list.selectedTab) {
        dispatch(listChangeTab(toTab));
      }

      const res = await fetch(`${API_PATH}liste/${tab}`, {
        method: 'get',
        headers: new Headers({
          'user-agent': 'Mozilla/4.0 MDN Example',
          'content-type': 'application/json',
          Authorization: `bearer ${apiKey}`,
        }),
      });

      const json = await res.json();

      if (json.status === 'success') {
        // ! add flat values here
        const normalized = normalize(json, { values: [folder] });
        dispatch(listLoaded(normalized, tab));
      } else {
        dispatch(listError(tab));
      }
    }
  } catch (e) {
    capture(e);
    dispatch(listError(tab));
  }
};

export type ListActions =
  | ListLoading
  | ListLoaded
  | ListChangeTab
  | ListError
  | ListUpdateSearch
  | ListUpdatePage
  | ListUpdatePageSize
  | ListUpdateSorted
  | LoadList;
