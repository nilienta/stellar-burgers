import { FC, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { Order } from '../../components/order/order';
import { searchItemById } from '../../utils/order-processing';
import { getCookie } from '../../utils/cookie';
import { Loader } from '../loader/loader';
import { useAppDispatch } from '../../services/types/types';
import {
  WS_HISTORY_CONNECTION_CLOSED,
  WS_HISTORY_CONNECTION_START,
} from '../../services/actions/web-socket-history';
import {
  WS_FEED_CONNECTION_CLOSED,
  WS_FEED_CONNECTION_START,
} from '../../services/actions/web-socket-feed';
import styles from './order.module.css';

type LocationState = {
  background?: Location;
};

export const OrderPage: FC = () => {
  const location = useLocation<LocationState>();
  const background = location.state && location.state.background;
  const { id }: { id: string } = useParams();
  const order = searchItemById(id);
  const accessToken = getCookie('accessToken');

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch({ type: WS_FEED_CONNECTION_START, payload: '/all' });
    dispatch({
      type: WS_HISTORY_CONNECTION_START,
      payload: `?token=${accessToken}`,
    });
    return () => {
      dispatch({ type: WS_FEED_CONNECTION_CLOSED });
      dispatch({ type: WS_HISTORY_CONNECTION_CLOSED });
    };
  }, [dispatch]);

  return (
    <>
      {!background ? (
        order ? (
          <>
            <main className={styles.main}>
              <section className={styles.container}>
                <div className={styles['order-number']}>
                  <p className="text text_type_digits-default mb-10">
                    {`#${order.number}`}
                  </p>
                </div>
                <Order />
              </section>
            </main>
          </>
        ) : (
          <Loader />
        )
      ) : (
        <></>
      )}
    </>
  );
};
