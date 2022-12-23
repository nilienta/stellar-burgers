import { authInitialState, authReducer } from './auth';
import * as login from '../actions/login';
import * as register from '../actions/register';
import * as getUser from '../actions/get-user-data';
import * as changeUser from '../actions/change-user-data';
import * as checkingMail from '../actions/checking-mail';
import * as resetPassword from '../actions/reset-password';
import * as logout from '../actions/logout';

describe('login request', () => {
  it('LOGIN_REQUEST', () => {
    const state = {
      ...authInitialState,
      loader: false,
      fail: true,
      textError: 'Error text',
    };
    const action = {
      type: login.LOGIN_REQUEST,
    };

    expect(authReducer(state, action)).toEqual({
      ...state,
      loader: true,
      fail: false,
      textError: '',
    });
  });

  it('LOGIN_SUCCESS', () => {
    const state = {
      ...authInitialState,
      loader: true,
      fail: true,
      isAuth: false,
      possibleEmail: 'name@email.com',
      refreshToken: '',
      accessToken: '',
      user: null,
    };
    const action = {
      type: login.LOGIN_SUCCESS,
      user: { email: 'name@email.com', name: 'name' },
      refreshToken: 'refreshToken',
      accessToken: 'Bearer accessToken',
    };

    expect(authReducer(state, action)).toEqual({
      ...state,
      loader: false,
      isAuth: true,
      user: action.user,
      refreshToken: action.refreshToken,
      accessToken: action.accessToken.split('Bearer ')[1],
      possibleEmail: '',
      fail: false,
    });
  });

  it('LOGIN_FAILED', () => {
    const state = {
      ...authInitialState,
      fail: false,
      textError: '',
      isAuth: true,
      loader: true,
    };
    const action = {
      type: login.LOGIN_FAILED,
      textError: 'Error',
    };

    expect(authReducer(state, action)).toEqual({
      ...state,
      fail: true,
      textError: action.textError,
      isAuth: false,
      loader: false,
    });
  });
});

it('SET_POSSIBLE_EMAIL', () => {
  const state = {
    ...authInitialState,
    possibleEmail: '',
  };
  const action = {
    type: login.SET_POSSIBLE_EMAIL,
    possibleEmail: 'name@email.com',
  };

  expect(authReducer(state, action)).toEqual({
    ...state,
    possibleEmail: action.possibleEmail,
  });
});

describe('register request', () => {
  it('REGISTER_REQUEST', () => {
    const state = {
      ...authInitialState,
      loader: false,
      fail: true,
      textError: 'Error text',
    };
    const action = {
      type: register.REGISTER_REQUEST,
    };

    expect(authReducer(state, action)).toEqual({
      ...state,
      loader: true,
      fail: false,
      textError: '',
    });
  });

  it('REGISTER_SUCCESS', () => {
    const state = {
      ...authInitialState,
      loader: true,
      fail: true,
      isAuth: false,
      refreshToken: '',
      accessToken: '',
      user: null,
    };
    const action = {
      type: register.REGISTER_SUCCESS,
      user: { email: 'name@email.com', name: 'name' },
      refreshToken: 'refreshToken',
      accessToken: 'Bearer accessToken',
    };

    expect(authReducer(state, action)).toEqual({
      ...state,
      loader: false,
      isAuth: true,
      user: action.user,
      refreshToken: action.refreshToken,
      accessToken: action.accessToken.split('Bearer ')[1],
      fail: false,
    });
  });

  it('REGISTER_FAILED', () => {
    const state = {
      ...authInitialState,
      fail: false,
      textError: '',
      isAuth: true,
      loader: true,
    };
    const action = {
      type: register.REGISTER_FAILED,
      textError: 'Error',
    };

    expect(authReducer(state, action)).toEqual({
      ...state,
      fail: true,
      textError: action.textError,
      isAuth: false,
      loader: false,
    });
  });
});

describe('get user data', () => {
  it('GET_USER_DATA_REQUEST', () => {
    const state = {
      ...authInitialState,
      loader: false,
      fail: true,
      textError: 'Error text',
    };
    const action = {
      type: getUser.GET_USER_DATA_REQUEST,
    };

    expect(authReducer(state, action)).toEqual({
      ...state,
      loader: true,
      fail: false,
      textError: '',
    });
  });

  it('GET_USER_DATA_SUCCESS', () => {
    const state = {
      ...authInitialState,
      loader: true,
      fail: true,
      isAuth: false,
      refreshToken: '',
      accessToken: '',
      user: null,
    };
    const action = {
      type: getUser.GET_USER_DATA_SUCCESS,
      user: { email: 'name@email.com', name: 'name' },
      refreshToken: 'refreshToken',
      accessToken: 'accessToken',
    };

    expect(authReducer(state, action)).toEqual({
      ...state,
      loader: false,
      isAuth: true,
      user: action.user,
      refreshToken: action.refreshToken,
      accessToken: action.accessToken,
      fail: false,
    });
  });

  it('GET_USER_DATA_FAILED', () => {
    const state = {
      ...authInitialState,
      fail: false,
      textError: '',
      loader: true,
    };
    const action = {
      type: getUser.GET_USER_DATA_FAILED,
      textError: 'Error',
    };

    expect(authReducer(state, action)).toEqual({
      ...state,
      fail: true,
      textError: action.textError,
      loader: false,
    });
  });
});

describe('change user data', () => {
  it('CHANGE_USER_DATA_REQUEST', () => {
    const state = {
      ...authInitialState,
      loader: false,
      fail: true,
      textError: 'Error text',
    };
    const action = {
      type: changeUser.CHANGE_USER_DATA_REQUEST,
    };

    expect(authReducer(state, action)).toEqual({
      ...state,
      loader: true,
      fail: false,
      textError: '',
    });
  });

  it('CHANGE_USER_DATA_SUCCESS', () => {
    const state = {
      ...authInitialState,
      loader: true,
      fail: true,
      user: null,
    };
    const action = {
      type: changeUser.CHANGE_USER_DATA_SUCCESS,
      user: { email: 'name@email.com', name: 'name' },
    };

    expect(authReducer(state, action)).toEqual({
      ...state,
      loader: false,
      user: action.user,
      fail: false,
    });
  });

  it('CHANGE_USER_DATA_FAILED', () => {
    const state = {
      ...authInitialState,
      fail: false,
      textError: '',
      loader: true,
    };
    const action = {
      type: changeUser.CHANGE_USER_DATA_FAILED,
      textError: 'Error',
    };

    expect(authReducer(state, action)).toEqual({
      ...state,
      fail: true,
      textError: action.textError,
      loader: false,
    });
  });
});

describe('verification of mail existence', () => {
  it('CHECKING_EMAIL_REQUEST', () => {
    const state = {
      ...authInitialState,
      loader: false,
      fail: true,
      textError: 'Error text',
    };
    const action = {
      type: checkingMail.CHECKING_EMAIL_REQUEST,
    };

    expect(authReducer(state, action)).toEqual({
      ...state,
      loader: true,
      fail: false,
      textError: '',
    });
  });

  it('CHECKING_EMAIL_SUCCESS', () => {
    const state = {
      ...authInitialState,
      loader: true,
      fail: true,
      emailExists: false,
    };
    const action = {
      type: checkingMail.CHECKING_EMAIL_SUCCESS,
    };

    expect(authReducer(state, action)).toEqual({
      ...state,
      loader: false,
      emailExists: true,
      fail: false,
    });
  });

  it('CHECKING_EMAIL_FAILED', () => {
    const state = {
      ...authInitialState,
      fail: false,
      textError: '',
      loader: true,
    };
    const action = {
      type: checkingMail.CHECKING_EMAIL_FAILED,
      textError: 'Error',
    };

    expect(authReducer(state, action)).toEqual({
      ...state,
      fail: true,
      textError: action.textError,
      loader: false,
    });
  });
});

describe('password reset', () => {
  it('RESET_PASSWORD_REQUEST', () => {
    const state = {
      ...authInitialState,
      loader: false,
      fail: true,
      textError: 'Error text',
    };
    const action = {
      type: resetPassword.RESET_PASSWORD_REQUEST,
    };

    expect(authReducer(state, action)).toEqual({
      ...state,
      loader: true,
      fail: false,
      textError: '',
    });
  });

  it('RESET_PASSWORD_SUCCESS', () => {
    const state = {
      ...authInitialState,
      loader: true,
      fail: true,
    };
    const action = {
      type: resetPassword.RESET_PASSWORD_SUCCESS,
    };

    expect(authReducer(state, action)).toEqual({
      ...state,
      loader: false,
      fail: false,
    });
  });

  it('RESET_PASSWORD_FAILED', () => {
    const state = {
      ...authInitialState,
      fail: false,
      textError: '',
      loader: true,
    };
    const action = {
      type: resetPassword.RESET_PASSWORD_FAILED,
      textError: 'Error',
    };

    expect(authReducer(state, action)).toEqual({
      ...state,
      fail: true,
      textError: action.textError,
      loader: false,
    });
  });
});

describe('get user data', () => {
  it('LOGOUT_REQUEST', () => {
    const state = {
      ...authInitialState,
      loader: false,
      fail: true,
      textError: 'Error text',
    };
    const action = {
      type: logout.LOGOUT_REQUEST,
    };

    expect(authReducer(state, action)).toEqual({
      ...state,
      loader: true,
      fail: false,
      textError: '',
    });
  });

  it('LOGOUT_SUCCESS', () => {
    const state = {
      ...authInitialState,
      loader: true,
      fail: true,
      isAuth: true,
      refreshToken: 'refreshToken',
      accessToken: 'accessToken',
      user: { email: 'name@email.com', name: 'name' },
    };
    const action = {
      type: logout.LOGOUT_SUCCESS,
    };

    expect(authReducer(state, action)).toEqual({
      ...state,
      loader: false,
      isAuth: false,
      user: null,
      refreshToken: null,
      accessToken: null,
      fail: false,
    });
  });

  it('LOGOUT_FAILED', () => {
    const state = {
      ...authInitialState,
      fail: false,
      textError: '',
      loader: true,
    };
    const action = {
      type: logout.LOGOUT_FAILED,
      textError: 'Error',
    };

    expect(authReducer(state, action)).toEqual({
      ...state,
      fail: true,
      textError: action.textError,
      loader: false,
    });
  });
});
