import { Dispatch } from 'react';

import { BASE_URL } from './app';
import { getData } from '../../utils/burger-api';
import { TAuthActions } from '../types/types-auth';
import { setCookie, getCookie } from '../../utils/cookie';
import { AppDispatch } from '../..';

export const GET_USER_DATA_REQUEST: 'GET_USER_DATA/REQUEST' =
  'GET_USER_DATA/REQUEST';
export const GET_USER_DATA_SUCCESS: 'GET_USER_DATA/SUCCESS' =
  'GET_USER_DATA/SUCCESS';
export const GET_USER_DATA_FAILED: 'GET_USER_DATA/FAILED' =
  'GET_USER_DATA/FAILED';

export interface IGetUserDataRequestAction {
  readonly type: typeof GET_USER_DATA_REQUEST;
}
export interface IGetUserDataSuccessAction {
  readonly type: typeof GET_USER_DATA_SUCCESS;
  readonly user: { email: string; name: string };
  readonly refreshToken: string;
  readonly accessToken: string;
}
export interface IGetUserDataFailedAction {
  readonly type: typeof GET_USER_DATA_FAILED;
  readonly textError: string;
}

export type TGetUserDataActions =
  | IGetUserDataRequestAction
  | IGetUserDataSuccessAction
  | IGetUserDataFailedAction;

const saveTokens = (refreshToken: string, accessToken: string) => {
  setCookie('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};
const updateToken =
  (afterRefresh: (dispatch: AppDispatch) => void) =>
  (dispatch: Dispatch<TAuthActions | ((dispatch: AppDispatch) => void)>) => {
    const body = {
      token: localStorage.getItem('refreshToken'),
    };
    getData(`${BASE_URL}/auth/token`, 'POST', body)
      .then((res) => {
        saveTokens(res.refreshToken, res.accessToken.split('Bearer ')[1]);
        dispatch(afterRefresh);
      })
      .catch((error) => {
        dispatch({
          type: GET_USER_DATA_FAILED,
          textError: error.message,
        });
      });
  };

export const getUser = () => (dispatch: AppDispatch) => {
  const accessToken = getCookie('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  dispatch({
    type: GET_USER_DATA_REQUEST,
  });
  getData(`${BASE_URL}/auth/user`, 'GET', {}, true)
    .then((res) => {
      dispatch({
        type: GET_USER_DATA_SUCCESS,
        user: res.user,
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    })
    .catch((error) => {
      if (error.message === 'jwt expired') {
        dispatch(updateToken(getUser()));
      } else {
        dispatch({
          type: GET_USER_DATA_FAILED,
          textError: error.message,
        });
      }
    });
};
