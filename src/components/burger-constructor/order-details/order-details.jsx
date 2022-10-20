import clsx from 'clsx';
import styles from './order-details.module.css';

import { useEffect } from 'react';
import getData from '../../../utils/burger-api';

import { useDispatch, useSelector } from 'react-redux';
import { SET_NUMBER_ORDER } from '../../../services/actions/app';
import modalDone from '../../../images/modal-done.png';

const OrderDetails = () => {
  const classForOrder = clsx(styles['order-details'], 'mt-9');
  const classForNumber = clsx(
    styles['order-number'],
    'text text_type_digits-large',
    'mb-8'
  );

  const dispatch = useDispatch();
  const { currentBun, currentMainsAndSauces, numberOrder } = useSelector(
    (state) => state.app
  );

  const idIngredients = [
    currentBun._id,
    currentBun._id,
    ...currentMainsAndSauces.map((elem) => elem._id),
  ];
  const order = { ingredients: [...idIngredients] };

  useEffect(() => {
    if (order.ingredients.length > 0) {
      const URL_POST = 'https://norma.nomoreparties.space/api/orders';
      getData(URL_POST, 'POST', order).then((res) =>
        dispatch({
          type: SET_NUMBER_ORDER,
          numberOrder: String(res.order.number).padStart(6, '0'),
        })
      );
    }
  }, []);

  return (
    <section className={classForOrder}>
      <h1 className={classForNumber}>{numberOrder}</h1>
      <h2 className="text text_type_main-medium">идентификатор заказа</h2>
      <img
        className="mt-15 mb-15"
        src={modalDone}
        alt="Order accepted"
        width="122px"
        height="122px"
      />
      <p className="text text_type_main-default mb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </section>
  );
};

export default OrderDetails;
