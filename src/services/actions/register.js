import { BASE_URL } from './app';
import { getData } from '../../utils/burger-api';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

export function register(form) {
  return function (dispatch) {
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
}
