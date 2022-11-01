import { BASE_URL } from './app';
import { requestDefault } from '../../utils/burger-api';

export const SEND_EMAIL_FOR_PASSWORD_REQUEST =
  'SEND_EMAIL_FOR_PASSWORD_REQUEST';
export const SEND_EMAIL_FOR_PASSWORD_SUCCESS =
  'SEND_EMAIL_FOR_PASSWORD_SUCCESS';
export const SEND_EMAIL_FOR_PASSWORD_FAILED = 'SEND_EMAIL_FOR_PASSWORD_FAILED';

export function checkingEmail(email) {
  return function (dispatch) {
    dispatch({
      type: SEND_EMAIL_FOR_PASSWORD_REQUEST,
    });
    requestDefault(`${BASE_URL}/password-reset`, email)
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
}
