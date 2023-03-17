import { createReducer, createAction } from '@reduxjs/toolkit';

import {
  WS_HISTORY_CONNECTION_SUCCESS,
  WS_HISTORY_CONNECTION_ERROR,
  WS_HISTORY_CONNECTION_CLOSED,
  WS_HISTORY_GET_ORDERS,
} from '../actions/web-socket-history';
import { TWsInitialState, TListOrders } from '../types/types';

export const initialState: TWsInitialState = {
  wsConnected: false,
  orders: [],
  total: 0,
  totalToday: 0,
};

const isActionWithGetOrdersPayload = createAction<TListOrders>(
  WS_HISTORY_GET_ORDERS
);

export const wsHistoryReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(WS_HISTORY_CONNECTION_SUCCESS, (state) => {
      state.wsConnected = true;
    })
    .addCase(WS_HISTORY_CONNECTION_ERROR, (state) => {
      state.wsConnected = false;
    })
    .addCase(WS_HISTORY_CONNECTION_CLOSED, (state) => {
      state.wsConnected = false;
    })
    .addCase(isActionWithGetOrdersPayload, (state, action) => {
      const listOrders = action.payload;
      (state.orders = listOrders.orders.reverse()),
        (state.total = listOrders.total),
        (state.totalToday = listOrders.totalToday);
    });
});
