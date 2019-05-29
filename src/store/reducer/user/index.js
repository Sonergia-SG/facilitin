import { USER_ADD_TOKEN } from '../../types';

const initialState = {
  apiKey: null,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case USER_ADD_TOKEN:
      return { ...state, apiKey: action.apiKey };
    default:
      return state;
  }
};

export default user;
