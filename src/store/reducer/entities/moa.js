// @flow
import { LOGOUT } from '../../types';

type State = {};

type Action = {
  type: String,
}

type MoaReducer = (state: State, acton: Action) => State;

const moa : MoaReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGOUT:
      return {};
    default:
      return state;
  }
};

export default moa;
