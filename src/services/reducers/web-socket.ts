import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_ORDERS,
} from '../actions/web-socket';
import { TWsInitialState } from '../types/types';
import { createReducer, createAction } from '@reduxjs/toolkit';
import { TListOrders } from '../types/types';

export const initialState: TWsInitialState = {
  wsConnected: false,
  orders: [],
  total: 0,
  totalToday: 0,
};

const isActionWithGetOrdersPayload = createAction<TListOrders>('WS_GET_ORDERS');

export const wsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(WS_CONNECTION_SUCCESS, (state) => {
      state.wsConnected = true;
    })
    .addCase(WS_CONNECTION_ERROR, (state) => {
      state.wsConnected = false;
    })
    .addCase(WS_CONNECTION_CLOSED, (state) => {
      state.wsConnected = false;
    })
    .addCase(isActionWithGetOrdersPayload, (state, action) => {
      const listOrders = action.payload;
      (state.orders = listOrders.orders),
        (state.total = listOrders.total),
        (state.totalToday = listOrders.totalToday);
    });
});
