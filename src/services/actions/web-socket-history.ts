import { TCurrentOrder } from '../types/types';

export const WS_HISTORY_CONNECTION_START: 'WS_HISTORY/CONNECTION_START' =
  'WS_HISTORY/CONNECTION_START';
export const WS_HISTORY_CONNECTION_SUCCESS: 'WS_HISTORY/CONNECTION_SUCCESS' =
  'WS_HISTORY/CONNECTION_SUCCESS';
export const WS_HISTORY_CONNECTION_ERROR: 'WS_HISTORY/CONNECTION_ERROR' =
  'WS_HISTORY/CONNECTION_ERROR';
export const WS_HISTORY_CONNECTION_CLOSED: 'WS_HISTORY/CONNECTION_CLOSED' =
  'WS_HISTORY/CONNECTION_CLOSED';
export const WS_HISTORY_GET_ORDERS: 'WS_HISTORY/GET_ORDERS' =
  'WS_HISTORY/GET_ORDERS';

export interface IwsHistoryStartAction {
  readonly type: typeof WS_HISTORY_CONNECTION_START;
}
export interface IwsHistorySuccessAction {
  readonly type: typeof WS_HISTORY_CONNECTION_SUCCESS;
}
export interface IwsHistoryErrorAction {
  readonly type: typeof WS_HISTORY_CONNECTION_ERROR;
}
export interface IwsHistoryClosedAction {
  readonly type: typeof WS_HISTORY_CONNECTION_CLOSED;
}
export interface IGetOrdersHistoryAction {
  readonly type: typeof WS_HISTORY_GET_ORDERS;

  readonly payload: {
    readonly orders: TCurrentOrder[];
    readonly total: number;
    readonly totalToday: number;
  };
}

export type TwsHistoryActions =
  | IwsHistoryStartAction
  | IwsHistorySuccessAction
  | IwsHistoryErrorAction
  | IwsHistoryClosedAction
  | IGetOrdersHistoryAction;
