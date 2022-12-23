import { TCurrentOrder } from '../types/types';

export const WS_FEED_CONNECTION_START: 'WS_FEED/CONNECTION_START' =
  'WS_FEED/CONNECTION_START';
export const WS_FEED_CONNECTION_SUCCESS: 'WS_FEED/CONNECTION_SUCCESS' =
  'WS_FEED/CONNECTION_SUCCESS';
export const WS_FEED_CONNECTION_ERROR: 'WS_FEED/CONNECTION_ERROR' =
  'WS_FEED/CONNECTION_ERROR';
export const WS_FEED_CONNECTION_CLOSED: 'WS_FEED/CONNECTION_CLOSED' =
  'WS_FEED/CONNECTION_CLOSED';
export const WS_FEED_GET_ORDERS: 'WS_FEED/GET_ORDERS' = 'WS_FEED/GET_ORDERS';

export interface IWsStartAction {
  readonly type: typeof WS_FEED_CONNECTION_START;
}
export interface IWsSuccessAction {
  readonly type: typeof WS_FEED_CONNECTION_SUCCESS;
}
export interface IWsErrorAction {
  readonly type: typeof WS_FEED_CONNECTION_ERROR;
}
export interface IWsClosedAction {
  readonly type: typeof WS_FEED_CONNECTION_CLOSED;
}
export interface IGetOrdersAction {
  readonly type: typeof WS_FEED_GET_ORDERS;

  readonly payload: {
    readonly orders: TCurrentOrder[];
    readonly total: number;
    readonly totalToday: number;
  };
}

export type TWsActions =
  | IWsStartAction
  | IWsSuccessAction
  | IWsErrorAction
  | IWsClosedAction
  | IGetOrdersAction;
