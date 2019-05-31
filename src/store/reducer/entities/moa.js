import { LOGOUT } from '../../types';

const moa = (state = {}, action) => {
  switch (action.type) {
    case LOGOUT:
      return {};
    default:
      return state;
  }
};

export default moa;
