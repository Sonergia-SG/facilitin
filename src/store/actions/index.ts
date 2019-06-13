import { ThunkAction as Thunk } from 'redux-thunk';
import { Action } from 'redux';

import { AppState } from '../../store';


export * from './user';
export * from './views';

export type ThunkAction = Thunk<void, AppState, null, Action<string>>
