import { LOGOUT } from '../../types';

const moe = (state = {}, action) => {
  switch (action.type) {
    case LOGOUT:
      return {};
    default:
      return state;
  }
};

export default moe;
