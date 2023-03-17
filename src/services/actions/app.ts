import { Dispatch } from 'react';

import { getData } from '../../utils/burger-api';
import { TIngredient } from '../types/types';

export const GET_INGREDIENTS_REQUEST: 'GET_INGREDIENTS_REQUEST' =
  'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' =
  'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED: 'GET_INGREDIENTS_FAILED' =
  'GET_INGREDIENTS_FAILED';

export const SET_BUNS: 'SET_BUNS' = 'SET_BUNS';
export const SET_MAINS_AND_SAUCES: 'SET_MAINS_AND_SAUCES' =
  'SET_MAINS_AND_SAUCES';
export const MODIFY_CONSTRUCTOR_INGREDIENTS: 'MODIFY_CONSTRUCTOR_INGREDIENTS' =
  'MODIFY_CONSTRUCTOR_INGREDIENTS';
export const UPDATE_CONSTRUCTOR_LIST: 'UPDATE_CONSTRUCTOR_LIST' =
  'UPDATE_CONSTRUCTOR_LIST';
export const DELETE_INGREDIENTS: 'DELETE_INGREDIENTS' = 'DELETE_INGREDIENTS';
export const SET_TOTAL_PRICE: 'SET_TOTAL_PRICE' = 'SET_TOTAL_PRICE';

export const POST_ORDER_REQUEST: 'POST_ORDER_REQUEST' = 'POST_ORDER_REQUEST';
export const SET_NUMBER_ORDER: 'SET_NUMBER_ORDER' = 'SET_NUMBER_ORDER';
export const POST_ORDER_FAILED: 'POST_ORDER_FAILED' = 'POST_ORDER_FAILED';

export const SET_VISIBLE_MODAL_INGREDIENT: 'SET_VISIBLE_MODAL_INGREDIENT' =
  'SET_VISIBLE_MODAL_INGREDIENT';
export const SET_INVISIBLE_MODAL_INGREDIENT: 'SET_INVISIBLE_MODAL_INGREDIENT' =
  'SET_INVISIBLE_MODAL_INGREDIENT';
export const SET_VISIBLE_MODAL_CONSTRUCTOR: 'SET_VISIBLE_MODAL_CONSTRUCTOR' =
  'SET_VISIBLE_MODAL_CONSTRUCTOR';
export const SET_INVISIBLE_MODAL_CONSTRUCTOR: 'SET_INVISIBLE_MODAL_CONSTRUCTOR' =
  'SET_INVISIBLE_MODAL_CONSTRUCTOR';

export const RESET_STATE: 'RESET_STATE' = 'RESET_STATE';

export const BASE_URL: string = 'https://norma.nomoreparties.space/api';

export interface IGetIngredientsRequestAction {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}
export interface IGetIngredientsSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly ingredients: Array<TIngredient>;
}
export interface IGetIngredientsFailedAction {
  readonly type: typeof GET_INGREDIENTS_FAILED;
  readonly textError: string;
}

export type TIngredientsActions =
  | IGetIngredientsRequestAction
  | IGetIngredientsSuccessAction
  | IGetIngredientsFailedAction;

export interface ISenBunsAction {
  readonly type: typeof SET_BUNS;
}
export interface ISetMainsAndSaucesAction {
  readonly type: typeof SET_MAINS_AND_SAUCES;
  readonly mainsAndSauces: Array<TIngredient>;
}
export interface IModifyConstructorIngredientsAction {
  readonly type: typeof MODIFY_CONSTRUCTOR_INGREDIENTS;
  readonly item: TIngredient;
  readonly ingredients: ReadonlyArray<TIngredient>;
  readonly currentBun: TIngredient;
  readonly currentMainsAndSauces: ReadonlyArray<TIngredient>;
}
export interface IUpdateConstructorListAction {
  readonly type: typeof UPDATE_CONSTRUCTOR_LIST;
  readonly currentMainsAndSauces: ReadonlyArray<TIngredient>;
}
export interface IDeleteIngredientsAction {
  readonly type: typeof DELETE_INGREDIENTS;
  readonly item: TIngredient;
  readonly ingredients: ReadonlyArray<TIngredient>;
  readonly currentMainsAndSauces: ReadonlyArray<TIngredient>;
  readonly dragId: string;
}
export interface ISetTotalPriceAction {
  readonly type: typeof SET_TOTAL_PRICE;
  readonly totalPrice: number;
}

export type TConstructorActions =
  | ISenBunsAction
  | ISetMainsAndSaucesAction
  | IModifyConstructorIngredientsAction
  | IUpdateConstructorListAction
  | IDeleteIngredientsAction
  | ISetTotalPriceAction;

export interface IPostOrderRequestAction {
  readonly type: typeof POST_ORDER_REQUEST;
}
export interface ISetNumberOrderAction {
  readonly type: typeof SET_NUMBER_ORDER;
  readonly numberOrder: string;
}
export interface IPostOrderFailedAction {
  readonly type: typeof POST_ORDER_FAILED;
  readonly textError: string;
}

export type TAddOrderActions =
  | IPostOrderRequestAction
  | ISetNumberOrderAction
  | IPostOrderFailedAction;

export interface ISetVisibleIngredientAction {
  readonly type: typeof SET_VISIBLE_MODAL_INGREDIENT;
}
export interface ISetInvisibleIngredientAction {
  readonly type: typeof SET_INVISIBLE_MODAL_INGREDIENT;
}
export interface ISetVisibleModalAction {
  readonly type: typeof SET_VISIBLE_MODAL_CONSTRUCTOR;
}
export interface ISetInvisibleModalAction {
  readonly type: typeof SET_INVISIBLE_MODAL_CONSTRUCTOR;
}

export type TVisibleModalActions =
  | ISetVisibleIngredientAction
  | ISetInvisibleIngredientAction
  | ISetVisibleModalAction
  | ISetInvisibleModalAction;

export type TResetStateAction = {
  readonly type: typeof RESET_STATE;
};
export type TAppAction =
  | TIngredientsActions
  | TConstructorActions
  | TAddOrderActions
  | TVisibleModalActions
  | TResetStateAction;

// для размышлений
// export type TOrderActions =
//   | typeof GET_INGREDIENTS_SUCCESS
//   | typeof GET_INGREDIENTS_FAILED;

// function iTakeFoo(foo: 'foo') {}
// const any: 'foo' = 'foo';
// const test = {
//   someProp: any,
// };
// iTakeFoo(test.someProp);

// function identity<T>(arg: T): T {
//   return arg;
// }
// const efwf = identity('fdsfs');

export const getIngredients = (URL_API: string) => {
  return (dispatch: Dispatch<TAppAction>) => {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });
    getData(URL_API, 'GET')
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            ingredients: res.data,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: GET_INGREDIENTS_FAILED,
          textError: error.message,
        });
      });
  };
};
export const postOrder = (
  URL_POST: string,
  order: { ingredients: (string | number | undefined)[] }
) => {
  return (dispatch: Dispatch<TAppAction>) => {
    dispatch({
      type: POST_ORDER_REQUEST,
    });
    getData(URL_POST, 'POST', order)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: SET_NUMBER_ORDER,
            numberOrder: String(res.order.number).padStart(6, '0'),
          });
          dispatch({
            type: RESET_STATE,
          });
        }
      })
      .catch((error) =>
        dispatch({
          type: POST_ORDER_FAILED,
          textError: error.message,
        })
      );
  };
};
