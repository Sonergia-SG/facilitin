import { LOGOUT } from '../../types';

const travaux = (state = {}, action) => {
  switch (action.type) {
    case LOGOUT:
      return {};
    default:
      return state;
  }
};

export default travaux;
