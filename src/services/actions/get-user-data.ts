import { BASE_URL } from './app';
import { getData } from '../../utils/burger-api';
import { Dispatch } from 'react';
import { TAuthActions } from '../types/types-auth';
import { setCookie, getCookie } from '../../utils/cookie';
import { AppDispatch } from '../..';
import { deleteCookie } from '../../utils/cookie';

export const GET_USER_DATA_REQUEST: 'GET_USER_DATA_REQUEST' =
  'GET_USER_DATA_REQUEST';
export const GET_USER_DATA_SUCCESS: 'GET_USER_DATA_SUCCESS' =
  'GET_USER_DATA_SUCCESS';
export const GET_USER_DATA_FAILED: 'GET_USER_DATA_FAILED' =
  'GET_USER_DATA_FAILED';

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

// плодяться ассес токен на страницах профиля и истории
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
      .catch((err) => {
        dispatch({
          type: GET_USER_DATA_FAILED,
          textError: err.message,
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
    .catch((err) => {
      if (err.message === 'jwt expired') {
        dispatch(updateToken(getUser()));
      } else {
        dispatch({
          type: GET_USER_DATA_FAILED,
          textError: err.message,
        });
      }
    });
};
