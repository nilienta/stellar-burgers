import { useAppSelector } from './types';

export const getStatus = (status: string) => {
  if (status === 'done') {
    return (
      <p className="text text_type_main-default text_color_success">Выполнен</p>
    );
  } else if (status === 'created') {
    return <p className="text text_type_main-default">Создан</p>;
  } else if (status === 'created') {
    return <p className="text text_type_main-default">Готовится</p>;
  } else {
    return (
      <p className="text text_type_main-default">Статус пока не известен</p>
    );
  } 
};
export const searchItemById = (id: string) => {
  const ordersHistory = useAppSelector((state) => state.wsToken.orders);
  const orders = useAppSelector((state) => state.ws.orders);

  const historySearch = ordersHistory
    ? ordersHistory!.find((el: any) => el._id === id)
    : [];
  const feedSearch = orders ? orders!.find((el: any) => el._id === id) : [];

  return feedSearch ? feedSearch : historySearch;
};

export const getTotalPriceForOrder = (order: any) => {
  const { ingredients } = useAppSelector((state) => state.app);
  let totalPrice: number = 0;
  if (ingredients && ingredients.length > 0) {
    const composition = order.ingredients;
    composition.map((ID: any) => {
      let item = ingredients.find((el) => el._id === ID);
      if (item) {
        totalPrice += item.price!;
      }
    });
  }
  return totalPrice;
};

export const getArrayOrderIngredients = (order: any) => {
  const { ingredients } = useAppSelector((state) => state.app);
  let arrOrderIngredients: object[] = [];
  if (ingredients !== undefined && ingredients.length > 0) {
    const composition = order.ingredients;
    composition.map((ID: any) => {
      let item = ingredients.find((el) => el._id === ID);
      if (item) {
        arrOrderIngredients.push(item);
      }
    });
  }
  return arrOrderIngredients;
};
