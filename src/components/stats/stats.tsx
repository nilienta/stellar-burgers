import React, { FC, useMemo } from 'react';
import styles from './stats.module.css';
import clsx from 'clsx';
import { TCurrentOrder } from '../../utils/types';
import { useAppSelector } from '../../utils/types';

const Stats: FC = () => {
  const { totalToday, total, orders } = useAppSelector((state) => state.ws);
  const completedToday = totalToday;
  const completedAllTime = total;

  const { done, inWork } = useMemo(
    () => ({
      done: orders.filter((item: TCurrentOrder) => item.status === 'done'),
      inWork: orders.filter((item: TCurrentOrder) => item.status !== 'done'),
    }),
    [orders]
  );

  return (
    <article className={styles.container}>
      <section className={styles['order-number']}>
        <section className={styles.column}>
          <p className="text text_type_main-medium mb-6">Готовы:</p>
          <div className={styles['list-number']}>
            {done.map((item: TCurrentOrder, index: number) => {
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
        <section className={styles.column}>
          <p className="text text_type_main-medium mb-6">В работе:</p>
          <div className={styles['list-number']}>
            {inWork.map((item: TCurrentOrder) => {
              return (
                <p className="text text_type_digits-default mb-2">
                  {item.number}
                </p>
              );
            })}
          </div>
        </section>
      </section>
      <section className={styles.row}>
        <p className="text text_type_main-medium mb-6">
          Выполнено за все время:
        </p>
        <p className={clsx('text text_type_digits-large', styles.number)}>
          {completedAllTime}
        </p>
      </section>
      <section className={styles.row}>
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
        <p className={clsx('text text_type_digits-large', styles.number)}>
          {completedToday}
        </p>
      </section>
    </article>
  );
};

export default React.memo(Stats);
