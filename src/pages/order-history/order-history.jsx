import styles from './order-history.module.css';
import Header from '../../components/header/header';
import MenuProfile from '../../components/menu-profile/menu-profile';

const OrderHistoryPage = () => {
  return (
    <>
      <Header />
      <div className={`${styles.wrapper}`}>
        <main className={`${styles.main}`}>
          <MenuProfile />
          <section className={styles.container}>
            <h1> Тут точно должно, что-то появиться</h1>
          </section>
        </main>
      </div>
    </>
  );
};

export default OrderHistoryPage;
