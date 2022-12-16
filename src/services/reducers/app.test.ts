import { initialState, appReducer } from './app';
import * as t from '../actions/app';
import { testDataIngredient, testDataIngredients } from '../../utils/mocks';

describe('ingredients request', () => {
  it('GET_INGREDIENTS_REQUEST', () => {
    const state = {
      ...initialState,
      ingredientsRequest: false,
      ingredientsFailed: true,
      textError: 'Error text',
    };
    const action = {
      type: t.GET_INGREDIENTS_REQUEST,
    };

    expect(appReducer(state, action)).toEqual({
      ...state,
      ingredientsRequest: true,
      ingredientsFailed: false,
      textError: '',
    });
  });

  it('GET_INGREDIENTS_SUCCESS', () => {
    const state = {
      ...initialState,
      ingredientsFailed: true,
      ingredients: [],
      ingredientsRequest: true,
    };
    const action = {
      type: t.GET_INGREDIENTS_SUCCESS,
      ingredients: testDataIngredients,
    };
    const newState = appReducer(state, action);

    expect(newState.ingredients.length).toBe(2);
    expect(newState).toEqual({
      ...state,
      ingredientsFailed: false,
      ingredients: action.ingredients,
      ingredientsRequest: false,
    });
  });

  it('GET_INGREDIENTS_FAILED', () => {
    const state = {
      ...initialState,
      ingredientsFailed: false,
      ingredientsRequest: true,
      textError: '',
    };
    const action = {
      type: t.GET_INGREDIENTS_FAILED,
      textError: '',
    };

    expect(appReducer(state, action)).toEqual({
      ...state,
      ingredients: [],
      ingredientsFailed: true,
      ingredientsRequest: false,
      textError: action.textError,
    });
  });
});

describe('app constructor set', () => {
  it('SET_BUNS', () => {
    const state = {
      ...initialState,
      ingredients: [],
    };
    const action = {
      type: t.SET_BUNS,
    };
    expect(appReducer(state, action)).toEqual({
      ...state,
      ingredients: [],
    });
  });

  it('SET_MAINS_AND_SAUCES', () => {
    const state = {
      ...initialState,
      mainsAndSauces: null,
    };
    const action = {
      type: t.SET_MAINS_AND_SAUCES,
      mainsAndSauces: testDataIngredients,
    };
    const newState = appReducer(state, action);

    expect(newState.currentMainsAndSauces.length).toBe(2);
    expect(newState).toEqual({
      ...state,
      currentMainsAndSauces: action.mainsAndSauces,
    });
  });

  //FIXME не пускает данные в массивы
  it('MODIFY_CONSTRUCTOR_INGREDIENTS', () => {
    const action = {
      type: t.MODIFY_CONSTRUCTOR_INGREDIENTS,
      item: testDataIngredient,
      ingredients: [],
      currentBun: testDataIngredient,
      currentMainsAndSauces: [],
    };

    expect(appReducer(initialState, action)).toEqual({
      ...initialState,
      ingredients: action.ingredients,
      currentBun: action.currentBun,
      currentMainsAndSauces: action.currentMainsAndSauces,
    });
  });

  it('UPDATE_CONSTRUCTOR_LIST', () => {
    const state = {
      ...initialState,
      currentMainsAndSauces: [],
    };
    const action = {
      type: t.UPDATE_CONSTRUCTOR_LIST,
      currentMainsAndSauces: testDataIngredients,
    };

    const newState = appReducer(state, action);

    expect(newState.currentMainsAndSauces.length).toBe(2);
    expect(newState).toEqual({
      ...state,
      currentMainsAndSauces: action.currentMainsAndSauces,
    });
  });

  //FIXME не пускает данные в массивы
  it('DELETE_INGREDIENTS', () => {
    const state = {
      ...initialState,
      currentMainsAndSauces: [],
      ingredients: [],
    };
    const action = {
      type: t.DELETE_INGREDIENTS,
      item: testDataIngredient,
      currentMainsAndSauces: [],
      ingredients: [],
      dragId: '123',
    };

    expect(appReducer(state, action)).toEqual({
      ...state,
      currentMainsAndSauces: action.currentMainsAndSauces,
      ingredients: action.ingredients,
    });
  });

  it('SET_TOTAL_PRICE', () => {
    const state = {
      ...initialState,
      totalPrice: 0,
    };
    const action = {
      type: t.SET_TOTAL_PRICE,
      totalPrice: 1111,
    };

    expect(appReducer(state, action)).toEqual({
      ...state,
      totalPrice: action.totalPrice,
    });
  });
});

describe('set add order', () => {
  it('POST_ORDER_REQUEST', () => {
    const state = {
      ...initialState,
      postOrderRequest: false,
      postOrderFailed: true,
      textError: 'Error text',
    };
    const action = {
      type: t.POST_ORDER_REQUEST,
    };

    expect(appReducer(state, action)).toEqual({
      ...state,
      postOrderRequest: true,
      postOrderFailed: false,
      textError: '',
    });
  });

  it('POST_ORDER_FAILED', () => {
    const state = {
      ...initialState,
      numberOrder: '123123',
      postOrderFailed: false,
      ingredients: [],
      postOrderRequest: true,
      textError: '',
    };
    const action = {
      type: t.POST_ORDER_FAILED,
      textError: 'Error',
    };

    expect(appReducer(state, action)).toEqual({
      ...state,
      numberOrder: 'XXXXXX',
      postOrderRequest: false,
      postOrderFailed: true,
      textError: action.textError,
    });
  });

  it('SET_NUMBER_ORDER', () => {
    const state = {
      ...initialState,
      postOrderRequest: true,
      postOrderFailed: true,
    };
    const action = {
      type: t.SET_NUMBER_ORDER,
      numberOrder: 'XXXXXX',
    };
    expect(appReducer(state, action)).toEqual({
      ...state,
      postOrderRequest: false,
      postOrderFailed: false,
      numberOrder: action.numberOrder,
    });
  });
});

describe('set visible modal', () => {
  it('SET_VISIBLE_MODAL_INGREDIENT', () => {
    const state = {
      ...initialState,
      isModalIngredientOpen: false,
    };
    const action = {
      type: t.SET_VISIBLE_MODAL_INGREDIENT,
    };

    expect(appReducer(state, action)).toEqual({
      ...state,
      isModalIngredientOpen: true,
    });
  });

  it('SET_INVISIBLE_MODAL_INGREDIENT', () => {
    const state = {
      ...initialState,
      isModalIngredientOpen: true,
    };
    const action = {
      type: t.SET_INVISIBLE_MODAL_INGREDIENT,
    };

    expect(appReducer(state, action)).toEqual({
      ...state,
      isModalIngredientOpen: false,
    });
  });

  it('SET_VISIBLE_MODAL_CONSTRUCTOR', () => {
    const state = {
      ...initialState,
      isModalConstructorOpen: false,
    };
    const action = {
      type: t.SET_VISIBLE_MODAL_CONSTRUCTOR,
    };
    expect(appReducer(state, action)).toEqual({
      ...state,
      isModalConstructorOpen: true,
    });
  });

  it('SET_INVISIBLE_MODAL_CONSTRUCTOR', () => {
    const state = {
      ...initialState,
      isModalConstructorOpen: true,
    };
    const action = {
      type: t.SET_INVISIBLE_MODAL_CONSTRUCTOR,
    };
    expect(appReducer(state, action)).toEqual({
      ...state,
      isModalConstructorOpen: false,
    });
  });
});

// FIXME не дает заменить объекты и массивы
it('RESET_STATE', () => {
  const state = {
    ...initialState,
    isModalConstructorOpen: true,
  };
  const action = {
    type: t.RESET_STATE,
    currentMainsAndSauces: [],
    currentBun: {},
    ingredients: [],
  };

  expect(appReducer(state, action)).toEqual({
    ...state,
    currentMainsAndSauces: [],
    currentBun: {},
    ingredients: [],
  });
});
