import { TAuthInitialState } from '../types/types';
import { TAuthActions } from '../types/types-auth';

import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED } from '../actions/login';
import { SET_POSSIBLE_EMAIL } from '../actions/login';

import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
} from '../actions/register';

import {
  SEND_EMAIL_FOR_PASSWORD_REQUEST,
  SEND_EMAIL_FOR_PASSWORD_SUCCESS,
  SEND_EMAIL_FOR_PASSWORD_FAILED,
} from '../actions/checking-mail';

import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
} from '../actions/reset-password';

import {
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
} from '../actions/logout';

import {
  GET_USER_DATA_REQUEST,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_FAILED,
} from '../actions/get-user-data';

import {
  CHANGE_USER_DATA_REQUEST,
  CHANGE_USER_DATA_SUCCESS,
  CHANGE_USER_DATA_FAILED,
} from '../actions/change-user-data';

import { setCookie, deleteCookie } from '../../utils/cookie';

export const authInitialState: TAuthInitialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  possibleEmail: '',

  emailExists: false,

  isAuth: false,
  loader: false,
  fail: false,
  textError: '',
};

export const authReducer = (
  state = authInitialState,
  action: TAuthActions
): TAuthInitialState => {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return {
        ...state,
        loader: true,
        fail: false,
        textError: '',
      };
    }
    case LOGIN_SUCCESS: {
      setCookie('accessToken', action.accessToken!.split('Bearer ')[1]);
      localStorage.setItem('refreshToken', action.refreshToken!);
      return {
        ...state,
        loader: false,
        isAuth: true,
        user: action.user!,
        refreshToken: action.refreshToken!,
        accessToken: action.accessToken!.split('Bearer ')[1],
        possibleEmail: '',
        fail: false,
      };
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        fail: true,
        textError: action.textError,
        isAuth: false,
        loader: false,
      };
    }
    case REGISTER_REQUEST: {
      return {
        ...state,
        loader: true,
        fail: false,
        textError: '',
      };
    }
    case REGISTER_SUCCESS: {
      setCookie('accessToken', action.accessToken!.split('Bearer ')[1]);
      localStorage.setItem('refreshToken', action.refreshToken!);
      return {
        ...state,
        loader: false,
        user: action.user!,
        refreshToken: action.refreshToken!,
        accessToken: action.accessToken!.split('Bearer ')[1],
        isAuth: true,
        fail: false,
      };
    }
    case REGISTER_FAILED: {
      return {
        ...state,
        fail: true,
        textError: action.textError,
        isAuth: false,
        loader: false,
      };
    }
    case SET_POSSIBLE_EMAIL: {
      return {
        ...state,
        possibleEmail: String(action.possibleEmail),
      };
    }
    case GET_USER_DATA_REQUEST: {
      return {
        ...state,
        loader: true,
        fail: false,
        textError: '',
      };
    }
    case GET_USER_DATA_SUCCESS: {
      return {
        ...state,
        loader: false,
        fail: false,
        user: action.user!,
        isAuth: true,
        accessToken: action.accessToken!,
        refreshToken: action.refreshToken!,
      };
    }
    case GET_USER_DATA_FAILED: {
      return {
        ...state,
        loader: false,
        fail: true,
        textError: action.textError,
      };
    }
    case CHANGE_USER_DATA_REQUEST: {
      return {
        ...state,
        loader: true,
        fail: false,
        textError: '',
      };
    }
    case CHANGE_USER_DATA_SUCCESS: {
      return {
        ...state,
        loader: false,
        fail: false,
        user: action.user!,
      };
    }
    case CHANGE_USER_DATA_FAILED: {
      return {
        ...state,
        loader: false,
        fail: true,
        textError: action.textError,
      };
    }
    case SEND_EMAIL_FOR_PASSWORD_REQUEST: {
      return {
        ...state,
        loader: true,
        fail: false,
        textError: '',
      };
    }
    case SEND_EMAIL_FOR_PASSWORD_SUCCESS: {
      return {
        ...state,
        loader: false,
        emailExists: true,
        fail: false,
      };
    }
    case SEND_EMAIL_FOR_PASSWORD_FAILED: {
      return {
        ...state,
        fail: true,
        loader: false,
        textError: action.textError,
      };
    }
    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        loader: true,
        fail: false,
        textError: '',
      };
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        loader: false,
        fail: false,
      };
    }
    case RESET_PASSWORD_FAILED: {
      return {
        ...state,
        fail: true,
        textError: action.textError,
        loader: false,
      };
    }
    case LOGOUT_REQUEST: {
      return {
        ...state,
        loader: true,
        fail: false,
        textError: '',
      };
    }
    case LOGOUT_SUCCESS: {
      deleteCookie('accessToken');
      return {
        ...state,
        loader: false,
        user: null,
        accessToken: null,
        refreshToken: null,
        isAuth: false,
        fail: false,
      };
    }
    case LOGOUT_FAILED: {
      return {
        ...state,
        fail: true,
        textError: action.textError,
        loader: false,
      };
    }
    default: {
      return state;
    }
  }
};
