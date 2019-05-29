import { USER_ADD_TOKEN, LOGOUT } from '../../types';

const initialState = {
  apiKey: null,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case USER_ADD_TOKEN:
      return { ...state, apiKey: action.apiKey };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default user;
