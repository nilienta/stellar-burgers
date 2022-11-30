import React, { FC } from 'react';
import clsx from 'clsx';
import styles from './list-order.module.css';
import OrderLine from '../order-line/order-line';

const ListOrder: FC<{ needStatus: boolean }> = ({ needStatus }) => {
  const classForSection = clsx(styles.container, 'custom-scroll');
  return (
    <section className={classForSection}>
      <OrderLine needStatus={needStatus} />
      <OrderLine needStatus={needStatus} />
      <OrderLine needStatus={needStatus} />
      <OrderLine needStatus={needStatus} />
      <OrderLine needStatus={needStatus} />
    </section>
  );
};

export default React.memo(ListOrder);
