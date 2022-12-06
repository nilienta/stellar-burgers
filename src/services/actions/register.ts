import { BASE_URL } from './app';
import { getData } from '../../utils/burger-api';
import { Dispatch } from 'react';
import { TAuthActions } from '../types/types-auth';

export const REGISTER_REQUEST: 'REGISTER_REQUEST' = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS: 'REGISTER_SUCCESS' = 'REGISTER_SUCCESS';
export const REGISTER_FAILED: 'REGISTER_FAILED' = 'REGISTER_FAILED';

export interface IRegisterRequestAction {
  readonly type: typeof REGISTER_REQUEST;
}
export interface IRegisterSuccessAction {
  readonly type: typeof REGISTER_SUCCESS;
  readonly user: { email: string; name: string };
  readonly refreshToken: string;
  readonly accessToken: string;
}
export interface IRegisterFailedAction {
  readonly type: typeof REGISTER_FAILED;
}

export type TRegisterActions =
  | IRegisterRequestAction
  | IRegisterSuccessAction
  | IRegisterFailedAction;

export const register = (form: {
  name?: string;
  password?: string;
  email?: string;
}) => {
  return (dispatch: Dispatch<TAuthActions>) => {
    dispatch({
      type: REGISTER_REQUEST,
    });
    getData(`${BASE_URL}/auth/register`, 'POST', form)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: REGISTER_SUCCESS,
            user: res.user,
            refreshToken: res.refreshToken,
            accessToken: res.accessToken,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: REGISTER_FAILED,
        });
        console.log(err.message);
      });
  };
};
