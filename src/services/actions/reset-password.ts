import { BASE_URL } from './app';
import { getData } from '../../utils/burger-api';
import { Dispatch } from 'react';
import { TAuthAction } from '../../utils/types';

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';

export const passwordSaveReset = (form: {
  password?: string;
  token?: string;
}) => {
  return (dispatch: Dispatch<TAuthAction>) => {
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
      .catch((err) => {
        dispatch({
          type: RESET_PASSWORD_FAILED,
        });
        console.log(err.message);
      });
  };
};
