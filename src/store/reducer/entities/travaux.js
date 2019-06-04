// @flow
import { LOGOUT } from '../../types';

type State = {};

type Action = {
  type: String,
};

type TravauxReducer = (state: State, acton: Action) => State;

const travaux: TravauxReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGOUT:
      return {};
    default:
      return state;
  }
};

export default travaux;
