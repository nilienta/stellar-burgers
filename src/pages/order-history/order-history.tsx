import React, { FC } from 'react';
import styles from './order-history.module.css';
import MenuProfile from '../../components/menu-profile/menu-profile';
import ListOrder from '../../components/list-order/list-order';

const OrderHistoryPage: FC = () => {
  return (
    <div className={`${styles.wrapper}`}>
      <main className={`${styles.main}`}>
        <article className="mt-20">
          <MenuProfile />
        </article>
        <ListOrder needStatus={true} />
      </main>
    </div>
  );
};

export default React.memo(OrderHistoryPage);
