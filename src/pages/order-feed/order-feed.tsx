import { FC, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../services/types/types';
import { WS_CONNECTION_START } from '../../services/actions/web-socket';
import styles from './order-feed.module.css';
import ListOrder from '../../components/list-order/list-order';
import Stats from '../../components/stats/stats';

const OrderFeedPage: FC = () => {
  const { orders } = useAppSelector((state) => state.ws);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START });
  }, [dispatch]);

  return (
    <main className={styles.main}>
      <h1 className="text text_type_main-large">Лента заказов</h1>
      <div className={styles.wrap}>
        {orders.length > 0 ? (
          <>
            <ListOrder needStatus={false} list={orders} />
            <Stats />
          </>
        ) : (
          <></>
        )}
      </div>
    </main>
  );
};

export default OrderFeedPage;
