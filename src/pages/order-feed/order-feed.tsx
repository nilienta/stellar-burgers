import React, { FC } from 'react';
import styles from './order-feed.module.css';
import ListOrder from '../../components/list-order/list-order';
import Stats from '../../components/stats/stats';

const OrderFeedPage: FC = () => {
  return (
    <main className={styles.main}>
      <h1 className="text text_type_main-large">Лента заказов</h1>
      <div className={styles.wrap}>
        <ListOrder needStatus={false} />
        <Stats />
      </div>
    </main>
  );
};

export default React.memo(OrderFeedPage);
