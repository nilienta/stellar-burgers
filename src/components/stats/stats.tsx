import React, { FC, useMemo } from 'react';
import clsx from 'clsx';

import { useAppSelector } from '../../services/types/types';
import styles from './stats.module.css';

export const Stats: FC = React.memo(() => {
  const { totalToday, total, orders } = useAppSelector((state) => state.wsFeed);
  const completedToday = totalToday;
  const completedAllTime = total;

  const { done, inWork } = useMemo(
    () => ({
      done: orders.filter((item) => item.status === 'done'),
      inWork: orders.filter((item) => item.status !== 'done'),
    }),
    [orders]
  );

  const CompletedOrders = () => {
    return (
      <section className={styles.column}>
        <p className="text text_type_main-medium mb-6">Готовы:</p>
        <div className={styles['list-number']}>
          {done.map((item, index) => {
            return (
              <p
                className="text text_type_digits-default text_color_success mb-2"
                key={index}
              >
                {item.number}
              </p>
            );
          })}
        </div>
      </section>
    );
  };
  const OrdersInProgress = () => {
    return (
      <section className={styles.column}>
        <p className="text text_type_main-medium mb-6">В работе:</p>
        <div className={styles['list-number']}>
          {inWork.map((item) => {
            return (
              <p className="text text_type_digits-default mb-2">
                {item.number}
              </p>
            );
          })}
        </div>
      </section>
    );
  };
  const AllTimeOrders = () => {
    return (
      <section className={styles.row}>
        <p className="text text_type_main-medium mb-6">
          Выполнено за все время:
        </p>
        <p className={clsx('text text_type_digits-large', styles.number)}>
          {completedAllTime}
        </p>
      </section>
    );
  };
  const OrdersForToday = () => {
    return (
      <section className={styles.row}>
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
        <p className={clsx('text text_type_digits-large', styles.number)}>
          {completedToday}
        </p>
      </section>
    );
  };

  return (
    <article className={styles.container}>
      <section className={styles['order-number']}>
        <CompletedOrders />
        <OrdersInProgress />
      </section>
      <AllTimeOrders />
      <OrdersForToday />
    </article>
  );
});
