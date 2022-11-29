import { combineReducers } from 'redux';
import { appReducer } from './app';
import { authReducer } from './auth';

export const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
});
