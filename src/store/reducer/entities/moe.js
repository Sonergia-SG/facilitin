// @flow
import { LOGOUT } from '../../types';

type State = {};

type Action = {
  type: String,
};

type MoeReducer = (state: State, acton: Action) => State;

const moe: MoeReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGOUT:
      return {};
    default:
      return state;
  }
};

export default moe;
