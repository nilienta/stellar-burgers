import { TRegisterActions } from '../actions/register';
import { TSendEmailActions } from '../actions/checking-mail';
import { TLogoutActions } from '../actions/logout';
import { TResetPassActions } from '../actions/reset-password';
import { TChangeUserDataActions } from '../actions/change-user-data';
import { TGetUserDataActions } from '../actions/get-user-data';
import { TLoginActions, TPossibleEmail } from '../actions/login';

export type TAuthActions =
  | TRegisterActions
  | TSendEmailActions
  | TLogoutActions
  | TResetPassActions
  | TGetUserDataActions
  | TLoginActions
  | TPossibleEmail
  | TChangeUserDataActions;
