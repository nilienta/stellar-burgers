import { getData } from '../../utils/burger-api';
import { BASE_URL } from './app';
import { AppDispatch } from '../..';

export const CHANGE_USER_DATA_REQUEST: 'CHANGE_USER_DATA/REQUEST' =
  'CHANGE_USER_DATA/REQUEST';
export const CHANGE_USER_DATA_SUCCESS: 'CHANGE_USER_DATA/SUCCESS' =
  'CHANGE_USER_DATA/SUCCESS';
export const CHANGE_USER_DATA_FAILED: 'CHANGE_USER_DATA/FAILED' =
  'CHANGE_USER_DATA/FAILED';

export interface IChangeUserDataRequestAction {
  readonly type: typeof CHANGE_USER_DATA_REQUEST;
}
export interface IChangeUserDataSuccessAction {
  readonly type: typeof CHANGE_USER_DATA_SUCCESS;
  readonly user: { name: string; email: string };
}
export interface IChangeUserDataFailedAction {
  readonly type: typeof CHANGE_USER_DATA_FAILED;
  readonly textError: string;
}

export type TChangeUserDataActions =
  | IChangeUserDataRequestAction
  | IChangeUserDataSuccessAction
  | IChangeUserDataFailedAction;

export const updateUserData = (form: { name?: string; email?: string }) => {
  return (dispatch: AppDispatch) => {
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
      .catch((error) => {
        dispatch({
          type: CHANGE_USER_DATA_FAILED,
          textError: error.message,
        });
      });
  };
};
