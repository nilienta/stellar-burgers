import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '..';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type TIngredient = {
  _id?: string | number;
  name?: string;
  type?: string;
  proteins?: number;
  fat?: number;
  carbohydrates?: number;
  calories?: number;
  price?: number;
  image?: string;
  image_mobile?: string;
  image_large?: string;
  count?: number;
  dragId?: string;
};
export type TAppInitialState = {
  ingredients: Array<TIngredient>;
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;

  currentBun: TIngredient;
  currentMainsAndSauces: Array<TIngredient>;

  postOrderRequest: boolean;
  postOrderFailed: boolean;
  totalPrice?: number;
  numberOrder: string;

  visibleIngredient: object;
  isModalIngredientOpen: boolean;
  isModalConstructorOpen: boolean;
};

export type TAppAction = {
  type: string;
  ingredients?: Array<TIngredient>;
  mainsAndSauces?: Array<TIngredient>;
  currentMainsAndSauces?: Array<TIngredient>;
  item?: TIngredient;
  dragId?: string;
  totalPrice?: number;
  numberOrder?: string;
  visibleIngredient?: object;
  error?: Error;
};

export type TAuthInitialState = {
  user: { email: string; name: string } | null;
  accessToken: string | null;
  refreshToken: string | null;
  possibleEmail: string;

  prevLocation: string;
  emailExists: boolean;

  isAuth: boolean;
  loader: boolean;
  fail: boolean;
};

export type TAuthAction = {
  type: string;
  accessToken?: string;
  refreshToken?: string;
  user?: { email: string; name: string };
  possibleEmail?: string;
  prevLocation?: string;
  textError?: string;
};
