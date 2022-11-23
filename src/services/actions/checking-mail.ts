import { BASE_URL } from './app';
import { getData } from '../../utils/burger-api';
import { Dispatch } from 'react';
import { TAuthAction } from '../../utils/types';

export const SEND_EMAIL_FOR_PASSWORD_REQUEST =
  'SEND_EMAIL_FOR_PASSWORD_REQUEST';
export const SEND_EMAIL_FOR_PASSWORD_SUCCESS =
  'SEND_EMAIL_FOR_PASSWORD_SUCCESS';
export const SEND_EMAIL_FOR_PASSWORD_FAILED = 'SEND_EMAIL_FOR_PASSWORD_FAILED';

export const checkingEmail = (email: { email?: string }) => {
  return (dispatch: Dispatch<TAuthAction>) => {
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
      .catch((err) => {
        dispatch({
          type: SEND_EMAIL_FOR_PASSWORD_FAILED,
        });
        console.log(err.message);
      });
  };
};
