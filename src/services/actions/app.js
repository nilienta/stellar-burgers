import getData from '../../utils/burger-api';
export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const SET_BUNS = 'SET_BUNS';
export const SET_MAINS_AND_SAUCES = 'SET_MAINS_AND_SAUCES';
export const MODIFY_CONSTRUCTOR_INGREDIENTS = 'MODIFY_CONSTRUCTOR_INGREDIENTS';
export const UPDATE_CONSTRUCTOR_LIST = 'UPDATE_CONSTRUCTOR_LIST';
export const DELETE_INGREDIENTS = 'DELETE_INGREDIENTS';
export const SET_TOTAL_PRICE = 'SET_TOTAL_PRICE';
export const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST';
export const SET_NUMBER_ORDER = 'SET_NUMBER_ORDER';
export const POST_ORDER_FAILED = 'POST_ORDER_FAILED';
export const SET_VISIBLE_INGREDIENT = 'SET_VISIBLE_INGREDIENT';
export const SET_VISIBLE_MODAL_INGREDIENT = 'SET_VISIBLE_MODAL_INGREDIENT';
export const SET_INVISIBLE_MODAL_INGREDIENT = 'SET_INVISIBLE_MODAL_INGREDIENT';
export const RESET_STATE = 'RESET_STATE';

export const BASE_URL = 'https://norma.nomoreparties.space/api';

export function getIngredients(URL_API) {
  return function (dispatch) {
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
        } else {
          dispatch({
            type: GET_INGREDIENTS_FAILED,
          });
        }
      })
      .catch((e) => console.log(e));
  };
}
export function postOrder(URL_POST, order) {
  return function (dispatch) {
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
        } else {
          dispatch({
            type: POST_ORDER_FAILED,
          });
        }
      })
      .catch((e) => console.log(e));
  };
}
