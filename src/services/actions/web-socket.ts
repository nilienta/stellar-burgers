import { TCurrentOrder } from '../types/types';

export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' =
  'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' =
  'WS_CONNECTION_CLOSED';
export const WS_GET_ORDERS: 'WS_GET_ORDERS' = 'WS_GET_ORDERS';

export interface IWsStartAction {
  readonly type: typeof WS_CONNECTION_START;
}
export interface IWsSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}
export interface IWsErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR;
}
export interface IWsClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED;
}
export interface IGetOrdersAction {
  readonly type: typeof WS_GET_ORDERS;

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
