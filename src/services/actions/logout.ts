import { getData } from '../../utils/burger-api';
import { TAuthActions } from '../types/types-auth';
import { Dispatch } from 'react';
import { BASE_URL } from './app';

export const LOGOUT_REQUEST: 'LOGOUT/REQUEST' = 'LOGOUT/REQUEST';
export const LOGOUT_SUCCESS: 'LOGOUT/SUCCESS' = 'LOGOUT/SUCCESS';
export const LOGOUT_FAILED: 'LOGOUT/FAILED' = 'LOGOUT/FAILED';

export interface ILogoutRequestAction {
  readonly type: typeof LOGOUT_REQUEST;
}
export interface ILogoutSuccessAction {
  readonly type: typeof LOGOUT_SUCCESS;
}
export interface ILogoutFailedAction {
  readonly type: typeof LOGOUT_FAILED;
  readonly textError: string;
}

export type TLogoutActions =
  | ILogoutRequestAction
  | ILogoutSuccessAction
  | ILogoutFailedAction;

export const signOut = (refreshToken: string) => {
  const body = {
    token: refreshToken,
  };
  return (dispatch: Dispatch<TAuthActions>) => {
    dispatch({
      type: LOGOUT_REQUEST,
    });
    getData(`${BASE_URL}/auth/logout`, 'POST', body)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: LOGOUT_SUCCESS,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: LOGOUT_FAILED,
          textError: error.message,
        });
      });
  };
};
