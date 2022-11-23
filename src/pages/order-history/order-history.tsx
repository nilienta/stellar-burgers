import { FC } from 'react';
import styles from './order-history.module.css';
import MenuProfile from '../../components/menu-profile/menu-profile';

const OrderHistoryPage: FC = () => {
  return (
    <div className={`${styles.wrapper}`}>
      <main className={`${styles.main}`}>
        <MenuProfile />
        <section className={styles.container}>
          <h1> Тут точно должно, что-то появиться</h1>
        </section>
      </main>
    </div>
  );
};

export default OrderHistoryPage;
