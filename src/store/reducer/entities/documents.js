import { LOGOUT } from '../../types';

const documents = (state = {}, action) => {
  switch (action.type) {
    case LOGOUT:
      return {};
    default:
      return state;
  }
};

export default documents;
