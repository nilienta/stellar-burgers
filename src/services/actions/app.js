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
export const SET_NUMBER_ORDER = 'SET_NUMBER_ORDER';
export const SET_VISIBLE_INGREDIENT = 'SET_VISIBLE_INGREDIENT';
export const SET_VISIBLE_MODAL_INGREDIENT = 'SET_VISIBLE_MODAL_INGREDIENT';
export const SET_INVISIBLE_MODAL_INGREDIENT = 'SET_INVISIBLE_MODAL_INGREDIENT';

export function getIngredients(URL_API) {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });
    getData(URL_API, 'GET').then((res) => {
      if (res && res.success) {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          ingredients: res.data,
        });
        dispatch({
          type: SET_BUNS,
        });
      } else {
        dispatch({
          type: GET_INGREDIENTS_FAILED,
        });
      }
    });
  };
}
