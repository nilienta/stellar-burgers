import { BASE_URL } from './app';
import { getData } from '../../utils/burger-api';
import { TAuthActions } from '../types/types-auth';
import { Dispatch } from 'react';

export const LOGIN_REQUEST: 'LOGIN_REQUEST' = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS: 'LOGIN_SUCCESS' = 'LOGIN_SUCCESS';
export const LOGIN_FAILED: 'LOGIN_FAILED' = 'LOGIN_FAILED';
export const SET_POSSIBLE_EMAIL: 'SET_POSSIBLE_EMAIL' = 'SET_POSSIBLE_EMAIL';

export interface ILoginRequestAction {
  readonly type: typeof LOGIN_REQUEST;
}
export interface ILoginSuccessAction {
  readonly type: typeof LOGIN_SUCCESS;
  readonly user: { email: string; name: string };
  readonly refreshToken: string;
  readonly accessToken: string;
}
export interface ILoginFailedAction {
  readonly type: typeof LOGIN_FAILED;
  readonly textError: string;
}

export type TLoginActions =
  | ILoginRequestAction
  | ILoginSuccessAction
  | ILoginFailedAction;

export type TPossibleEmail = {
  readonly type: typeof SET_POSSIBLE_EMAIL;
  readonly possibleEmail: string;
};

export const signIn = (form: {
  name?: string;
  password?: string;
  email?: string;
}) => {
  return (dispatch: Dispatch<TAuthActions>) => {
    dispatch({
      type: LOGIN_REQUEST,
    });
    getData(`${BASE_URL}/auth/login`, 'POST', form)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: LOGIN_SUCCESS,
            user: res.user,
            refreshToken: res.refreshToken,
            accessToken: res.accessToken,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: LOGIN_FAILED,
          textError: error.message,
        });
      });
  };
};
