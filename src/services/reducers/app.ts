import type { TAppInitialState } from '../types/types';
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  SET_BUNS,
  SET_MAINS_AND_SAUCES,
  MODIFY_CONSTRUCTOR_INGREDIENTS,
  UPDATE_CONSTRUCTOR_LIST,
  DELETE_INGREDIENTS,
  SET_TOTAL_PRICE,
  POST_ORDER_REQUEST,
  SET_NUMBER_ORDER,
  POST_ORDER_FAILED,
  SET_VISIBLE_MODAL_INGREDIENT,
  SET_INVISIBLE_MODAL_INGREDIENT,
  SET_VISIBLE_MODAL_CONSTRUCTOR,
  SET_INVISIBLE_MODAL_CONSTRUCTOR,
  RESET_STATE,
  TAppAction,
} from '../actions/app';

export const initialState: TAppInitialState = {
  ingredients: [],
  ingredientsRequest: true,
  ingredientsFailed: false,
  textError: '',

  currentBun: {},
  currentMainsAndSauces: [],

  postOrderRequest: true,
  postOrderFailed: false,
  totalPrice: 0,
  numberOrder: 'XXXXXX',

  isModalIngredientOpen: false,
  isModalConstructorOpen: false,
};

export const appReducer = (
  state = initialState,
  action: TAppAction
): TAppInitialState => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true,
        ingredientsFailed: false,
        textError: '',
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsFailed: false,
        ingredients: action.ingredients!,
        ingredientsRequest: false,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredients: [],
        ingredientsFailed: true,
        ingredientsRequest: false,
        textError: action.textError,
      };
    }
    case SET_BUNS: {
      return {
        ...state,
        ingredients: [...state.ingredients].map((item) =>
          item._id === state.currentBun._id ? { ...item, count: 1 } : item
        ),
      };
    }
    case SET_MAINS_AND_SAUCES: {
      return {
        ...state,
        currentMainsAndSauces: action.mainsAndSauces!,
      };
    }
    case MODIFY_CONSTRUCTOR_INGREDIENTS: {
      if (action.item.type === 'bun') {
        if (state.currentBun._id !== action.item._id) {
          const oldBun = [...state.ingredients].map((item) =>
            item._id === state.currentBun._id ? { ...item, count: 0 } : item
          );
          const newBun = [...oldBun].map((item) =>
            item._id === action.item._id ? { ...item, count: 1 } : item
          );
          return {
            ...state,
            currentBun: action.item!,
            ingredients: [...newBun],
          };
        } else {
          return {
            ...state,
          };
        }
      } else {
        return {
          ...state,
          currentMainsAndSauces: [...state.currentMainsAndSauces, action.item],
          ingredients: [...state.ingredients].map((item) =>
            item._id === action.item._id
              ? { ...item, count: item.count! > 0 ? item.count! + 1 : 1 }
              : item
          ),
        };
      }
    }
    case UPDATE_CONSTRUCTOR_LIST: {
      return {
        ...state,
        currentMainsAndSauces: [...(action.currentMainsAndSauces || [])],
      };
    }
    case DELETE_INGREDIENTS: {
      return {
        ...state,
        currentMainsAndSauces: [...state.currentMainsAndSauces].filter(
          (item) => item.dragId !== action.dragId
        ),
        ingredients: [...state.ingredients].map((item) =>
          item._id === action.item!._id
            ? { ...item, count: item.count! - 1 }
            : item
        ),
      };
    }
    case SET_TOTAL_PRICE: {
      return {
        ...state,
        totalPrice: action.totalPrice!,
      };
    }
    case POST_ORDER_REQUEST: {
      return {
        ...state,
        postOrderRequest: true,
        postOrderFailed: false,
        textError: '',
      };
    }
    case POST_ORDER_FAILED: {
      return {
        ...state,
        numberOrder: 'XXXXXX',
        postOrderRequest: false,
        postOrderFailed: true,
        textError: action.textError,
      };
    }
    case SET_NUMBER_ORDER: {
      return {
        ...state,
        postOrderRequest: false,
        postOrderFailed: false,
        numberOrder: action.numberOrder!,
      };
    }
    case SET_VISIBLE_MODAL_INGREDIENT: {
      return {
        ...state,
        isModalIngredientOpen: true,
      };
    }
    case SET_INVISIBLE_MODAL_INGREDIENT: {
      return {
        ...state,
        isModalIngredientOpen: false,
      };
    }
    case SET_VISIBLE_MODAL_CONSTRUCTOR: {
      return {
        ...state,
        isModalConstructorOpen: true,
      };
    }
    case SET_INVISIBLE_MODAL_CONSTRUCTOR: {
      return {
        ...state,
        isModalConstructorOpen: false,
      };
    }
    case RESET_STATE: {
      return {
        ...state,
        currentMainsAndSauces: [],
        currentBun: {},
        ingredients: [...state.ingredients].map((item) => ({
          ...item,
          count: 0,
        })),
      };
    }
    default: {
      return state;
    }
  }
};
