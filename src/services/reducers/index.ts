import { combineReducers } from 'redux';
import { appReducer } from './app';
import { authReducer } from './auth';
import { wsReducer } from './web-socket';
import { wsReducerToken } from './web-socket-token';

export const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  ws: wsReducer,
  wsToken: wsReducerToken,
});
