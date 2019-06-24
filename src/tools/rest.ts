import idx from 'idx';
import { getStore } from '../store/index';

const rest = (input: RequestInfo, init?: RequestInit) => {
  const apiKey = idx(getStore(), _ => _.getState().user.apiKey);

  const improvedInit = {
    ...init,
    headers: {
      'content-type': 'application/json',
      Authorization: apiKey ? `bearer ${apiKey}` : '',
    },
  };
  return fetch(input, improvedInit);
};

export default rest;
