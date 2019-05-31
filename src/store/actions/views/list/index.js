import { normalize } from 'normalizr';

import {
  LIST_LOADING,
  LIST_LOADED,
  LIST_ERROR,
  LIST_CHANGE_TAB,
  LIST_CHANGE_SEARCH,
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

export const loadList = toTab => async (dispatch, getState) => {
  dispatch(listLoading());
  const { apiKey } = getState().user;

  const tab = toTab || getState().views.list.selectedTab;

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
      const normalized = normalize(json, { values: [folder] });
      dispatch(listLoaded(normalized, tab));
    } else {
      dispatch(listError());
    }
  } catch (e) {
    capture(e);
    dispatch(listError());
  }
};
