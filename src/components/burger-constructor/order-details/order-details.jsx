import clsx from 'clsx';
import styles from './order-details.module.css';

import { useContext, useEffect, useState } from 'react';
import { DataConstructorContext } from '../burger-context';
import { CheckResponseContext } from '../../App/app-context';

import modalDone from '../../../images/modal-done.png';

const classForOrder = clsx(styles['order-details'], 'mt-9');
const classForNumber = clsx(
  styles['order-number'],
  'text text_type_digits-large',
  'mb-8'
);

const OrderDetails = () => {
  const { checkResponse } = useContext(CheckResponseContext);
  const { dataConstructor } = useContext(DataConstructorContext);
  const [numberOrder, setNumberOrder] = useState('000000');

  const idIngredients = dataConstructor.map((elem) => elem._id);
  const order = { ingredients: [...idIngredients] };

  useEffect(() => {
    if (order.ingredients.length > 0) {
      const URL_POST = 'https://norma.nomoreparties.space/api/orders';

      const fetchPost = (URL, data) => {
        fetch(URL, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json: charset=utf-8',
          },
        })
          .then((res) => checkResponse(res))
          .then((res) => setNumberOrder(res.order.number))
          .catch((e) => console.log(e));
      };
      fetchPost(URL_POST, order);
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
