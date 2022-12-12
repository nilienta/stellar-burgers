import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { rootReducer } from './services/reducers';
import { socketMiddleware } from './services/middleware';
import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_GET_ORDERS,
} from './services/actions/web-socket';
import {
  WS_CONNECTION_START_TOKEN,
  WS_CONNECTION_SUCCESS_TOKEN,
  WS_CONNECTION_CLOSED_TOKEN,
  WS_CONNECTION_ERROR_TOKEN,
  WS_GET_ORDERS_TOKEN,
} from './services/actions/web-socket-token';

const wsUrl = 'wss://norma.nomoreparties.space/orders';
const wsActions = {
  wsInit: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_ORDERS,
};
const wsActionsToken = {
  wsInit: WS_CONNECTION_START_TOKEN,
  onOpen: WS_CONNECTION_SUCCESS_TOKEN,
  onClose: WS_CONNECTION_CLOSED_TOKEN,
  onError: WS_CONNECTION_ERROR_TOKEN,
  onMessage: WS_GET_ORDERS_TOKEN,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      socketMiddleware(wsUrl, wsActions),
      socketMiddleware(wsUrl, wsActionsToken)
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
