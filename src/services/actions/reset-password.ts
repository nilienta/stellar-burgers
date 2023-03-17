import { Dispatch } from 'react';

import { BASE_URL } from './app';
import { getData } from '../../utils/burger-api';
import { TAuthActions } from '../types/types-auth';

export const RESET_PASSWORD_REQUEST: 'RESET_PASSWORD/REQUEST' =
  'RESET_PASSWORD/REQUEST';
export const RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD/SUCCESS' =
  'RESET_PASSWORD/SUCCESS';
export const RESET_PASSWORD_FAILED: 'RESET_PASSWORD/FAILED' =
  'RESET_PASSWORD/FAILED';

export interface IResetPassRequestAction {
  readonly type: typeof RESET_PASSWORD_REQUEST;
}
export interface IResetPassSuccessAction {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
}
export interface IResetPassFailedAction {
  readonly type: typeof RESET_PASSWORD_FAILED;
  readonly textError: string;
}

export type TResetPassActions =
  | IResetPassRequestAction
  | IResetPassSuccessAction
  | IResetPassFailedAction;

export const passwordSaveReset = (form: {
  password?: string;
  token?: string;
}) => {
  return (dispatch: Dispatch<TAuthActions>) => {
    dispatch({
      type: RESET_PASSWORD_REQUEST,
    });
    getData(`${BASE_URL}/password-reset/reset`, 'POST', form)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: RESET_PASSWORD_SUCCESS,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: RESET_PASSWORD_FAILED,
          textError: error.message,
        });
      });
  };
};
