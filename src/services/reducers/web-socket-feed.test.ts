import { initialState, wsFeedReducer } from './web-socket-feed';
import * as t from '../actions/web-socket-feed';
import { testDataOrders } from '../../utils/mocks';

describe('connection installation with webSocket', () => {
  it('WS_FEED_CONNECTION_SUCCESS', () => {
    const state = {
      ...initialState,
      wsConnected: false,
    };
    const action = {
      type: t.WS_FEED_CONNECTION_SUCCESS,
    };

    expect(wsFeedReducer(state, action)).toEqual({
      ...state,
      wsConnected: true,
    });
  });

  it('WS_FEED_GET_ORDERS', () => {
    const state = {
      ...initialState,
      orders: [],
      total: 0,
      totalToday: 0,
    };
    const action = {
      type: t.WS_FEED_GET_ORDERS,
      payload: {
        orders: testDataOrders,
        total: 111111,
        totalToday: 111,
      },
    };

    expect(wsFeedReducer(state, action)).toEqual({
      ...state,
      orders: action.payload.orders,
      total: action.payload.total,
      totalToday: action.payload.totalToday,
    });
  });

  it('WS_FEED_CONNECTION_CLOSED', () => {
    const state = {
      ...initialState,
      wsConnected: true,
    };
    const action = {
      type: t.WS_FEED_CONNECTION_CLOSED,
    };

    expect(wsFeedReducer(state, action)).toEqual({
      ...state,
      wsConnected: false,
    });
  });

  it('WS_FEED_CONNECTION_ERROR', () => {
    const state = {
      ...initialState,
      wsConnected: true,
    };
    const action = {
      type: t.WS_FEED_CONNECTION_ERROR,
    };

    expect(wsFeedReducer(state, action)).toEqual({
      ...state,
      wsConnected: false,
    });
  });
});
