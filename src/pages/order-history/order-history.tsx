import { FC } from 'react';
import clsx from 'clsx';
import styles from './order-history.module.css';
import MenuProfile from '../../components/menu-profile/menu-profile';
import PreviousOrder from '../../components/previous-order/previous-order';

const OrderHistoryPage: FC = () => {
  const classForSection = clsx(styles.container, 'custom-scroll');

  return (
    <div className={`${styles.wrapper}`}>
      <main className={`${styles.main}`}>
        <MenuProfile />
        <section className={classForSection}>
          <PreviousOrder />
          <PreviousOrder />
          <PreviousOrder />
          <PreviousOrder />
          <PreviousOrder />
        </section>
      </main>
    </div>
  );
};

export default OrderHistoryPage;
