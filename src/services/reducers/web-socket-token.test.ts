import { initialState, wsReducerToken } from './web-socket-token';
import * as t from '../actions/web-socket-token';
import { testDataOrders } from '../../utils/mocks';

describe('connection installation with webSocket', () => {
  it('WS_CONNECTION_SUCCESS_TOKEN', () => {
    const state = {
      ...initialState,
      wsConnected: false,
    };
    const action = {
      type: t.WS_CONNECTION_SUCCESS_TOKEN,
    };

    expect(wsReducerToken(state, action)).toEqual({
      ...state,
      wsConnected: true,
    });
  });

  it('WS_GET_ORDERS_TOKEN', () => {
    const state = {
      ...initialState,
      orders: [],
      total: 0,
      totalToday: 0,
    };
    const action = {
      type: t.WS_GET_ORDERS_TOKEN,
      payload: {
        orders: testDataOrders,
        total: 111111,
        totalToday: 111,
      },
    };

    expect(wsReducerToken(state, action)).toEqual({
      ...state,
      orders: action.payload.orders,
      total: action.payload.total,
      totalToday: action.payload.totalToday,
    });
  });

  it('WS_CONNECTION_CLOSED_TOKEN', () => {
    const state = {
      ...initialState,
      wsConnected: true,
    };
    const action = {
      type: t.WS_CONNECTION_CLOSED_TOKEN,
    };

    expect(wsReducerToken(state, action)).toEqual({
      ...state,
      wsConnected: false,
    });
  });

  it('WS_CONNECTION_ERROR_TOKEN', () => {
    const state = {
      ...initialState,
      wsConnected: true,
    };
    const action = {
      type: t.WS_CONNECTION_ERROR_TOKEN,
    };

    expect(wsReducerToken(state, action)).toEqual({
      ...state,
      wsConnected: false,
    });
  });
});
