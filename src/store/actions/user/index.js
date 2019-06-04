// @flow
import { USER_ADD_TOKEN } from '../../types';

import { type UserReducerActionAddToken } from '../../reducer/user';

type AddToken = (apiKey: string) => UserReducerActionAddToken;

// eslint-disable-next-line import/prefer-default-export
export const addToken: AddToken = apiKey => ({
  type: USER_ADD_TOKEN,
  apiKey,
});

export type UserActions = AddToken;
