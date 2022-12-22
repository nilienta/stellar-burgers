import React, { FC } from 'react';
import clsx from 'clsx';
import styles from './order.module.css';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import CompositionLine from './composition-line/composition-line';
import { useParams } from 'react-router-dom';

import setTime from '../../utils/date';
import {
  getArrayOrderIngredients,
  getStatus,
  getTotalPriceForOrder,
  searchItemById,
} from '../../utils/order-processing';
import { TIngredient } from '../../services/types/types';

const Order: FC = () => {
  const { id }: { id: string } = useParams();
  const order = searchItemById(id);

  const status = order ? getStatus(order.status) : '';
  const totalPrice = order ? getTotalPriceForOrder(order) : 0;

  const arrOrderIngredients = order ? getArrayOrderIngredients(order) : [];
  let arrCount: { [id: string]: number } = {};
  const objNameCount = arrOrderIngredients.map((Ingredient) => {
    if (Ingredient._id && arrCount[Ingredient._id]) {
      const currentCount = arrCount[Ingredient._id] + 1;
      arrCount = { ...arrCount, [Ingredient._id]: currentCount };
    } else if (Ingredient._id) {
      arrCount = { ...arrCount, [Ingredient._id]: 1 };
    }
  });
  const unique = Array.from(new Set(arrOrderIngredients));

  const CompositionList = () => {
    return (
      <section className={clsx(styles.composition, 'custom-scroll', 'mb-10')}>
        {unique.map((item) => {
          const count = arrCount[item._id!];
          return <CompositionLine key={item._id} item={item} count={count} />;
        })}
      </section>
    );
  };

  const DateAndTotalPrice = () => {
    return (
      <div className={styles['data-line']}>
        <p className="text text_type_main-default text_color_inactive">
          {setTime(order!.createdAt)}
        </p>
        <div className={styles.price}>
          <p className="text text_type_digits-default">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    );
  };

  return (
    <>
      {order ? (
        <section className={styles.container}>
          <p className="text text_type_main-medium mb-3">{order.name}</p>
          {status}
          <p className="text text_type_main-medium mt-15 mb-6">Состав:</p>

          <CompositionList />
          <DateAndTotalPrice />
        </section>
      ) : (
        <></>
      )}
    </>
  );
};

export default React.memo(Order);
