import { UserAddTokenAction } from '../../reducer/user/types';
import { USER_ADD_TOKEN } from '../../types';

// eslint-disable-next-line import/prefer-default-export
export const addToken = (apiKey: string): UserAddTokenAction => ({
  type: USER_ADD_TOKEN,
  apiKey,
});
