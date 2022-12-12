import { BASE_URL } from './app';
import { getData } from '../../utils/burger-api';
import { Dispatch } from 'react';
import { TAuthActions } from '../types/types-auth';

export const SEND_EMAIL_FOR_PASSWORD_REQUEST: 'SEND_EMAIL_FOR_PASSWORD_REQUEST' =
  'SEND_EMAIL_FOR_PASSWORD_REQUEST';
export const SEND_EMAIL_FOR_PASSWORD_SUCCESS: 'SEND_EMAIL_FOR_PASSWORD_SUCCESS' =
  'SEND_EMAIL_FOR_PASSWORD_SUCCESS';
export const SEND_EMAIL_FOR_PASSWORD_FAILED: 'SEND_EMAIL_FOR_PASSWORD_FAILED' =
  'SEND_EMAIL_FOR_PASSWORD_FAILED';

export interface ISendEmailRequestAction {
  readonly type: typeof SEND_EMAIL_FOR_PASSWORD_REQUEST;
}
export interface ISendEmailSuccessAction {
  readonly type: typeof SEND_EMAIL_FOR_PASSWORD_SUCCESS;
}
export interface ISendEmailFailedAction {
  readonly type: typeof SEND_EMAIL_FOR_PASSWORD_FAILED;
  readonly textError: string;
}

export type TSendEmailActions =
  | ISendEmailRequestAction
  | ISendEmailSuccessAction
  | ISendEmailFailedAction;

export const checkingEmail = (email: { email?: string }) => {
  return (dispatch: Dispatch<TAuthActions>) => {
    dispatch({
      type: SEND_EMAIL_FOR_PASSWORD_REQUEST,
    });
    getData(`${BASE_URL}/password-reset`, 'POST', email)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: SEND_EMAIL_FOR_PASSWORD_SUCCESS,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: SEND_EMAIL_FOR_PASSWORD_FAILED,
          textError: error.message,
        });
      });
  };
};
