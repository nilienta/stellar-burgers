import {
  WS_CONNECTION_SUCCESS_TOKEN,
  WS_CONNECTION_ERROR_TOKEN,
  WS_CONNECTION_CLOSED_TOKEN,
  WS_GET_ORDERS_TOKEN,
} from '../actions/web-socket-token';
import { TWsInitialState } from '../types/types';
import { createReducer, createAction } from '@reduxjs/toolkit';
import { TListOrders } from '../types/types';

export const initialState: TWsInitialState = {
  wsConnected: false,
  orders: [],
  total: 0,
  totalToday: 0,
};

const isActionWithGetOrdersPayload =
  createAction<TListOrders>(WS_GET_ORDERS_TOKEN);

export const wsReducerToken = createReducer(initialState, (builder) => {
  builder
    .addCase(WS_CONNECTION_SUCCESS_TOKEN, (state) => {
      state.wsConnected = true;
    })
    .addCase(WS_CONNECTION_ERROR_TOKEN, (state) => {
      state.wsConnected = false;
    })
    .addCase(WS_CONNECTION_CLOSED_TOKEN, (state) => {
      state.wsConnected = false;
    })
    .addCase(isActionWithGetOrdersPayload, (state, action) => {
      const listOrders = action.payload;
      (state.orders = listOrders.orders.reverse()),
        (state.total = listOrders.total),
        (state.totalToday = listOrders.totalToday);
    });
});
