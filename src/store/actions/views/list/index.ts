import { normalize } from 'normalizr';
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';

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
import { operation } from '../../../reducer/entities/schema';

import capture from '../../../../tools/errorReporting/captureException';

import { AppState } from '../../../../store';
import {
  Tab,
  ListListLoadingAction,
  ListListLoadedNormalized,
  ListListLoadedAction,
  ListListChangeTabAction,
  ListListErrorAction,
  ListListChangeSearchAction,
  ListListChangePageAction,
  ListListPageSizeAction,
  ListListSortedAction,
  Sorted,
} from '../../../reducer/views/list/type';
import { Normalized, Entities } from '../../../reducer/entities/types';

export const listLoading = (tab: Tab): ListListLoadingAction => ({
  type: LIST_LOADING,
  tab,
});

export const listLoaded = (
  normalized: ListListLoadedNormalized & Normalized,
  tab: Tab,
): ListListLoadedAction => ({
  type: LIST_LOADED,
  normalized,
  tab,
});

export const listChangeTab = (tab: Tab): ListListChangeTabAction => ({
  type: LIST_CHANGE_TAB,
  tab,
});

export const listError = (tab: Tab): ListListErrorAction => ({
  type: LIST_ERROR,
  tab,
});

export const listUpdateSearch = (search: string): ListListChangeSearchAction => ({
  type: LIST_CHANGE_SEARCH,
  search,
});

export const listUpdatePage = (page: number): ListListChangePageAction => ({
  type: LIST_PAGE_UPDATE,
  page,
});

export const listUpdatePageSize = (pageSize: number): ListListPageSizeAction => ({
  type: LIST_PAGE_SIZE_UPDATE,
  pageSize,
});

export const listUpdateSorted = (sorted: Sorted): ListListSortedAction => ({
  type: LIST_SORTED_UPDATE,
  sorted,
});

export const loadList = (toTab?: Tab): ThunkAction<void, AppState, null, Action<string>> => async (
  dispatch,
  getState,
) => {
  const tab = toTab || getState().views.list.selectedTab;

  dispatch(listLoading(tab));
  const { apiKey } = getState().user;

  if (toTab !== undefined && toTab !== getState().views.list.selectedTab) {
    dispatch(listChangeTab(toTab));
  }

  try {
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
      const normalized = normalize<Entities, { values: Array<number> }>(json, { values: [operation] });
      dispatch(listLoaded(normalized, tab));
    } else {
      dispatch(listError(tab));
    }
  } catch (e) {
    capture(e);
    dispatch(listError(tab));
  }
};
