import { getData } from '../../utils/burger-api';
import { TAuthActions } from '../types/types-auth';
import { Dispatch } from 'react';
import { BASE_URL } from './app';

export const LOGOUT_REQUEST: 'LOGOUT_REQUEST' = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS: 'LOGOUT_SUCCESS' = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED: 'LOGOUT_FAILED' = 'LOGOUT_FAILED';

export interface ILogoutRequestAction {
  readonly type: typeof LOGOUT_REQUEST;
}
export interface ILogoutSuccessAction {
  readonly type: typeof LOGOUT_SUCCESS;
}
export interface ILogoutFailedAction {
  readonly type: typeof LOGOUT_FAILED;
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
      .catch((err) => {
        dispatch({
          type: LOGOUT_FAILED,
        });
        console.log(err.message);
      });
  };
};
