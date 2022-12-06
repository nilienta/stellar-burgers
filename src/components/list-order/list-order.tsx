import React, { FC } from 'react';
import clsx from 'clsx';
import styles from './list-order.module.css';
import OrderLine from './order-line/order-line';
import { TCurrentOrder } from '../../utils/types';

const ListOrder: FC<{ needStatus: boolean; list: TCurrentOrder[] }> = ({
  needStatus,
  list,
}) => {
  const classForSection = clsx(styles.container, 'custom-scroll');
  return (
    <>
      {list ? (
        <section className={classForSection}>
          {list.map((item: TCurrentOrder) => {
            return (
              <OrderLine needStatus={needStatus} order={item} key={item._id} />
            );
          })}
        </section>
      ) : (
        <></>
      )}
    </>
  );
};

export default React.memo(ListOrder);
