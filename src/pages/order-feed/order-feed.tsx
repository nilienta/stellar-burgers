import { FC, useEffect } from 'react';
import styles from './order-feed.module.css';

import ListOrder from '../../components/list-order/list-order';
import Stats from '../../components/stats/stats';
import Loader from '../loader/loader';

import { useAppSelector, useAppDispatch } from '../../services/types/types';
import {
  WS_FEED_CONNECTION_CLOSED,
  WS_FEED_CONNECTION_START,
} from '../../services/actions/web-socket-feed';

const OrderFeedPage: FC = () => {
  const { orders } = useAppSelector((state) => state.wsFeed);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch({ type: WS_FEED_CONNECTION_START, payload: '/all' });
    return () => {
      dispatch({ type: WS_FEED_CONNECTION_CLOSED });
    };
  }, [dispatch]);

  return (
    <>
      {orders.length > 0 ? (
        <main className={styles.main}>
          <h1 className="text text_type_main-large mb-5">Лента заказов</h1>
          <div className={styles.wrap}>
            <ListOrder needStatus={false} list={orders} />
            <Stats />
          </div>
        </main>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default OrderFeedPage;
