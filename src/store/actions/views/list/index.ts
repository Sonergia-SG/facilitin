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

import { addMessageToQueue } from '../../../../components/Alert';

import { API_PATH } from '../../../../variables';
import { operation } from '../../../reducer/entities/schema';

import capture from '../../../../tools/errorReporting/captureException';

import { ThunkAction } from '../..';
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
import rest from '../../../../tools/rest';

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

export const loadList = (toTab?: Tab): ThunkAction => async (
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
    const res = await rest(`${API_PATH}actions?type_liste=${tab}`);

    const json = await res.json();

    if (json.status === 'success') {
      // ! add flat values here
      const normalized = normalize<Entities, { values: number[] }>(json, { values: [operation] });
      dispatch(listLoaded(normalized, tab));
    } else {
      addMessageToQueue({
        duration: 2500,
        type: 'error',
        message: 'Erreur pendant la mise à jour de la liste',
      });
      dispatch(listError(tab));
    }
  } catch (e) {
    addMessageToQueue({
      duration: 2500,
      type: 'error',
      message: 'Erreur pendant la mise à jour de la liste',
    });
    capture(e);
    dispatch(listError(tab));
  }
};
