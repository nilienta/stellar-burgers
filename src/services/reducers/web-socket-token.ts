import {
  WS_CONNECTION_SUCCESS_TOKEN,
  WS_CONNECTION_ERROR_TOKEN,
  WS_CONNECTION_CLOSED_TOKEN,
  WS_GET_ORDERS_TOKEN,
} from '../actions/web-socket-token';
import { TWsInitialState } from '../types/types';
import { TWsTokenActions } from '../actions/web-socket-token';

const initialState: TWsInitialState = {
  wsConnected: false,
  orders: [],
  total: 0,
  totalToday: 0,
};

export const wsReducerToken = (
  state = initialState,
  action: TWsTokenActions
): TWsInitialState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS_TOKEN:
      return {
        ...state,
        wsConnected: true,
      };
    case WS_CONNECTION_ERROR_TOKEN:
      return {
        ...state,
        wsConnected: false,
      };

    case WS_CONNECTION_CLOSED_TOKEN:
      return {
        ...state,
        wsConnected: false,
      };

    case WS_GET_ORDERS_TOKEN:
      return {
        ...state,
        orders: action.payload.orders.reverse(),
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };
    default:
      return state;
  }
};
