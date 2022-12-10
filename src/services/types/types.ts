import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../..';

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
  ingredients: TIngredient[];
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
  textError: string;

  currentBun: TIngredient;
  currentMainsAndSauces: TIngredient[];

  postOrderRequest: boolean;
  postOrderFailed: boolean;
  totalPrice?: number;
  numberOrder: string;

  isModalIngredientOpen: boolean;
  isModalConstructorOpen: boolean;
};

export type TAuthInitialState = {
  user: { email: string; name: string } | null;
  accessToken: string | null;
  refreshToken: string | null;
  possibleEmail: string;

  emailExists: boolean;

  isAuth: boolean;
  loader: boolean;
  fail: boolean;
};

export type TCurrentOrder = {
  ingredients: string[];
  name: string;
  number: number;
  status: string;
  updatedAt: string;
  createdAt: string;
  _id: string;
};
export type TWsAction = {
  type: string;
  payload: TWsPayload;
};
export type TWsPayload = {
  orders: TCurrentOrder[];
  total: number;
  totalToday: number;
};
export type TWsInitialState = TWsPayload & {
  wsConnected: boolean;
};
export type TWsServerActions = {
  wsInit: string;
  onOpen: string;
  onClose: string;
  onError: string;
  onMessage: string;
};
