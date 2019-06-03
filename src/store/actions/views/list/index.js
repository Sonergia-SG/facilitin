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

export const listLoading = tab => ({
  type: LIST_LOADING,
  tab,
});

export const listLoaded = (normalized, tab) => ({
  type: LIST_LOADED,
  normalized,
  tab,
});

export const listChangeTab = tab => ({
  type: LIST_CHANGE_TAB,
  tab,
});

export const listError = tab => ({
  type: LIST_ERROR,
  tab,
});

export const listUpdateSearch = search => ({
  type: LIST_CHANGE_SEARCH,
  search,
});

export const listUpdatePage = page => ({
  type: LIST_PAGE_UPDATE,
  page,
});

export const listUpdatePageSize = pageSize => ({
  type: LIST_PAGE_SIZE_UPDATE,
  pageSize,
});

export const listUpdateSorted = sorted => ({
  type: LIST_SORTED_UPDATE,
  sorted,
});

export const loadList = toTab => async (dispatch, getState) => {
  try {
    const { list } = getState().views;
    const tab = toTab !== undefined ? toTab : list.selectedTab;

    const { loading } = list.tab[tab];

    if (!loading) {
      dispatch(listLoading(tab));
      const { apiKey } = getState().user;

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
        dispatch(listError());
      }
    }
  } catch (e) {
    capture(e);
    dispatch(listError());
  }
};
