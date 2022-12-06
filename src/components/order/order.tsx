import React, { FC } from 'react';
import clsx from 'clsx';
import styles from './order.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import CompositionLine from './composition-line/composition-line';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../services/types/types';
import setTime from '../../utils/date';
import {
  getArrayOrderIngredients,
  getStatus,
} from '../../utils/order-processing';
import { searchItemById } from '../../utils/order-processing';
import { getTotalPriceForOrder } from '../../utils/order-processing';
import { TIngredient } from '../../services/types/types';

const Order: FC = () => {
  const { id }: { id: string } = useParams();

  //FIXME сделать асинхронную функцию
  let order = searchItemById(id);
  let status;
  if (order) {
    status = getStatus(order.status);
  }

  const totalPrice = getTotalPriceForOrder(order);

  const arrOrderIngredients = getArrayOrderIngredients(order);
  let arrCount: any = {};
  const objNameCount = arrOrderIngredients.map((Ingredient: any) => {
    if (arrCount[Ingredient._id]) {
      const currentCount = arrCount[Ingredient._id] + 1;
      arrCount = { ...arrCount, [Ingredient._id]: currentCount };
    } else {
      arrCount = { ...arrCount, [Ingredient._id]: 1 };
    }
  });
  const unique = Array.from(new Set(arrOrderIngredients));

  return (
    <>
      {order ? (
        <section className={styles.container}>
          <p className="text text_type_main-medium mb-3">{order.name}</p>
          {status}
          <p className="text text_type_main-medium mt-15 mb-6">Состав:</p>
          <section
            className={clsx(styles.composition, 'custom-scroll', 'mb-10')}
          >
            {unique.map((item: TIngredient) => {
              const count = arrCount[item._id!];
              return (
                <CompositionLine key={item._id} item={item} count={count} />
              );
            })}
          </section>
          <div className={styles['data-line']}>
            <p className="text text_type_main-default text_color_inactive">
              {setTime(order.createdAt)}
            </p>
            <div className={styles.price}>
              <p className="text text_type_digits-default">{totalPrice}</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </section>
      ) : (
        <></>
      )}
    </>
  );
};

export default React.memo(Order);
