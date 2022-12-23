import { combineReducers } from 'redux';
import { appReducer } from './app';
import { authReducer } from './auth';
import { wsFeedReducer } from './web-socket-feed';
import { wsHistoryReducer } from './web-socket-history';

export const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  wsFeed: wsFeedReducer,
  wsHistory: wsHistoryReducer,
});
