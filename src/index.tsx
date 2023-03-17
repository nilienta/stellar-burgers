import ReactDOM from 'react-dom/client';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import { reportWebVitals } from './reportWebVitals';
import { App } from './components/app/app';
import { rootReducer } from './services/reducers';
import { socketMiddleware } from './services/middleware';
import {
  WS_FEED_CONNECTION_START,
  WS_FEED_CONNECTION_SUCCESS,
  WS_FEED_CONNECTION_CLOSED,
  WS_FEED_CONNECTION_ERROR,
  WS_FEED_GET_ORDERS,
} from './services/actions/web-socket-feed';
import {
  WS_HISTORY_CONNECTION_START,
  WS_HISTORY_CONNECTION_SUCCESS,
  WS_HISTORY_CONNECTION_CLOSED,
  WS_HISTORY_CONNECTION_ERROR,
  WS_HISTORY_GET_ORDERS,
} from './services/actions/web-socket-history';
import './index.css';

const wsUrl = 'wss://norma.nomoreparties.space/orders';
const wsFeedActions = {
  wsInit: WS_FEED_CONNECTION_START,
  onOpen: WS_FEED_CONNECTION_SUCCESS,
  onClose: WS_FEED_CONNECTION_CLOSED,
  onError: WS_FEED_CONNECTION_ERROR,
  onMessage: WS_FEED_GET_ORDERS,
};
const wsHistoryActions = {
  wsInit: WS_HISTORY_CONNECTION_START,
  onOpen: WS_HISTORY_CONNECTION_SUCCESS,
  onClose: WS_HISTORY_CONNECTION_CLOSED,
  onError: WS_HISTORY_CONNECTION_ERROR,
  onMessage: WS_HISTORY_GET_ORDERS,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      socketMiddleware(wsUrl, wsFeedActions),
      socketMiddleware(wsUrl, wsHistoryActions)
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

reportWebVitals();
