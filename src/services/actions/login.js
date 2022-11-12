import { BASE_URL } from './app';
import { getData } from '../../utils/burger-api';
import { getCookie, setCookie } from '../../utils/cookie';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const SET_POSSIBLE_EMAIL = 'SET_POSSIBLE_EMAIL';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';
export const GET_USER_DATA_REQUEST = 'GET_USER_DATA_REQUEST';
export const GET_USER_DATA_SUCCESS = 'GET_USER_DATA_SUCCESS';
export const GET_USER_DATA_FAILED = 'GET_USER_DATA_FAILED';
export const SET_LOCATION = 'SET_LOCATION';
export const CHANGE_USER_DATA_REQUEST = 'CHANGE_USER_DATA_REQUEST';
export const CHANGE_USER_DATA_SUCCESS = 'CHANGE_USER_DATA_SUCCESS';
export const CHANGE_USER_DATA_FAILED = 'CHANGE_USER_DATA_FAILED';

const saveTokens = (refreshToken, accessToken) => {
  setCookie('accessToken', accessToken);
  setCookie('refreshToken', refreshToken);
};

const updateToken = (afterRefresh) => (dispatch) => {
  const body = {
    token: getCookie('refreshToken'),
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

export const getUser = () => (dispatch) => {
  const accessToken = getCookie('accessToken');
  const refreshToken = getCookie('refreshToken');
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

export function signIn(form) {
  return function (dispatch) {
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
      .catch((err) => {
        dispatch({
          type: LOGIN_FAILED,
        });
        console.log(err.message);
      });
  };
}

export function signOut(refreshToken) {
  const body = {
    token: refreshToken,
  };
  return function (dispatch) {
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
}

export function updateUserData(form) {
  return function (dispatch) {
    dispatch({
      type: CHANGE_USER_DATA_REQUEST,
    });
    getData(`${BASE_URL}/auth/user`, 'PATCH', form, true)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: CHANGE_USER_DATA_SUCCESS,
            user: res.user,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: CHANGE_USER_DATA_FAILED,
        });
        console.log(err.message);
      });
  };
}
