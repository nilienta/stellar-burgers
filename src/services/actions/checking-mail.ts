import { BASE_URL } from './app';
import { getData } from '../../utils/burger-api';
import { Dispatch } from 'react';
import { TAuthActions } from '../types/types-auth';

export const CHECKING_EMAIL_REQUEST: 'CHECKING_EMAIL/REQUEST' =
  'CHECKING_EMAIL/REQUEST';
export const CHECKING_EMAIL_SUCCESS: 'CHECKING_EMAIL/SUCCESS' =
  'CHECKING_EMAIL/SUCCESS';
export const CHECKING_EMAIL_FAILED: 'CHECKING_EMAIL/FAILED' =
  'CHECKING_EMAIL/FAILED';

export interface ISendEmailRequestAction {
  readonly type: typeof CHECKING_EMAIL_REQUEST;
}
export interface ISendEmailSuccessAction {
  readonly type: typeof CHECKING_EMAIL_SUCCESS;
}
export interface ISendEmailFailedAction {
  readonly type: typeof CHECKING_EMAIL_FAILED;
  readonly textError: string;
}

export type TSendEmailActions =
  | ISendEmailRequestAction
  | ISendEmailSuccessAction
  | ISendEmailFailedAction;

export const checkingEmail = (email: { email?: string }) => {
  return (dispatch: Dispatch<TAuthActions>) => {
    dispatch({
      type: CHECKING_EMAIL_REQUEST,
    });
    getData(`${BASE_URL}/password-reset`, 'POST', email)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: CHECKING_EMAIL_SUCCESS,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: CHECKING_EMAIL_FAILED,
          textError: error.message,
        });
      });
  };
};
