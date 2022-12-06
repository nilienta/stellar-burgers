import { TCurrentOrder } from '../types/types';

export const WS_CONNECTION_START_TOKEN: 'WS_CONNECTION_START_TOKEN' =
  'WS_CONNECTION_START_TOKEN';
export const WS_CONNECTION_SUCCESS_TOKEN: 'WS_CONNECTION_SUCCESS_TOKEN' =
  'WS_CONNECTION_SUCCESS_TOKEN';
export const WS_CONNECTION_ERROR_TOKEN: 'WS_CONNECTION_ERROR_TOKEN' =
  'WS_CONNECTION_ERROR_TOKEN';
export const WS_CONNECTION_CLOSED_TOKEN: 'WS_CONNECTION_CLOSED_TOKEN' =
  'WS_CONNECTION_CLOSED_TOKEN';
export const WS_GET_ORDERS_TOKEN: 'WS_GET_ORDERS_TOKEN' = 'WS_GET_ORDERS_TOKEN';
export const WS_SEND_MESSAGE_TOKEN: 'WS_SEND_MESSAGE_TOKEN' =
  'WS_SEND_MESSAGE_TOKEN';

export interface IWsTokenStartAction {
  readonly type: typeof WS_CONNECTION_START_TOKEN;
}
export interface IWsTokenSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS_TOKEN;
}
export interface IWsTokenErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR_TOKEN;
}
export interface IWsTokenClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED_TOKEN;
}
export interface IGetOrdersHistoryAction {
  readonly type: typeof WS_GET_ORDERS_TOKEN;

  readonly payload: {
    readonly orders: TCurrentOrder[];
    readonly total: number;
    readonly totalToday: number;
  };
}
export interface ISendMessageTokenAction {
  readonly type: typeof WS_SEND_MESSAGE_TOKEN;
}

export type TWsTokenActions =
  | IWsTokenStartAction
  | IWsTokenSuccessAction
  | IWsTokenErrorAction
  | IWsTokenClosedAction
  | IGetOrdersHistoryAction
  | ISendMessageTokenAction;
