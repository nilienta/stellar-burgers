import { createReducer, createAction } from '@reduxjs/toolkit';

import {
  WS_FEED_CONNECTION_SUCCESS,
  WS_FEED_CONNECTION_ERROR,
  WS_FEED_CONNECTION_CLOSED,
  WS_FEED_GET_ORDERS,
} from '../actions/web-socket-feed';
import { TWsInitialState, TListOrders } from '../types/types';

export const initialState: TWsInitialState = {
  wsConnected: false,
  orders: [],
  total: 0,
  totalToday: 0,
};

const isActionWithGetOrdersPayload =
  createAction<TListOrders>(WS_FEED_GET_ORDERS);

export const wsFeedReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(WS_FEED_CONNECTION_SUCCESS, (state) => {
      state.wsConnected = true;
    })
    .addCase(WS_FEED_CONNECTION_ERROR, (state) => {
      state.wsConnected = false;
    })
    .addCase(WS_FEED_CONNECTION_CLOSED, (state) => {
      state.wsConnected = false;
    })
    .addCase(isActionWithGetOrdersPayload, (state, action) => {
      const listOrders = action.payload;
      (state.orders = listOrders.orders),
        (state.total = listOrders.total),
        (state.totalToday = listOrders.totalToday);
    });
});
