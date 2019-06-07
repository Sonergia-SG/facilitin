import { combineReducers } from 'redux';

import user from './user';
import views from './views';
import entities from './entities';

export default combineReducers({ user, views, entities });
