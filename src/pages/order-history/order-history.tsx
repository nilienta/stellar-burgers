import { FC, useEffect } from 'react';
import styles from './order-history.module.css';

import MenuProfile from '../../components/menu-profile/menu-profile';
import ListOrder from '../../components/list-order/list-order';
import { Redirect } from 'react-router-dom';
import { getCookie } from '../../utils/cookie';
import Loader from '../loader/loader';

import { useAppSelector, useAppDispatch } from '../../services/types/types';
import {
  WS_CONNECTION_CLOSED_TOKEN,
  WS_CONNECTION_START_TOKEN,
} from '../../services/actions/web-socket-token';

const OrderHistoryPage: FC = () => {
  const { isAuth } = useAppSelector((state) => state.auth);
  if (!isAuth) {
    return (
      <Redirect
        to={{
          pathname: '/login',
        }}
      />
    );
  }

  const { orders } = useAppSelector((state) => state.wsToken);

  const accessToken = getCookie('accessToken');
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START_TOKEN,
      payload: `?token=${accessToken}`,
    });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED_TOKEN });
    };
  }, [dispatch]);

  return (
    <>
      {orders !== undefined && orders.length > 0 ? (
        <div className={styles.wrapper}>
          <div className={styles.main}>
            <article className="mt-20">
              <MenuProfile page="history" />
            </article>
            <ListOrder needStatus={true} list={orders} />
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default OrderHistoryPage;
