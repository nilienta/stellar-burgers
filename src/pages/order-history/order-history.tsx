import { FC, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { MenuProfile } from '../../components/menu-profile/menu-profile';
import { ListOrder } from '../../components/list-order/list-order';
import { getCookie } from '../../utils/cookie';
import { Loader } from '../loader/loader';
import { useAppSelector, useAppDispatch } from '../../services/types/types';
import {
  WS_HISTORY_CONNECTION_CLOSED,
  WS_HISTORY_CONNECTION_START,
} from '../../services/actions/web-socket-history';
import styles from './order-history.module.css';

export const OrderHistoryPage: FC = () => {
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

  const { orders } = useAppSelector((state) => state.wsHistory);

  const accessToken = getCookie('accessToken');
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch({
      type: WS_HISTORY_CONNECTION_START,
      payload: `?token=${accessToken}`,
    });
    return () => {
      dispatch({ type: WS_HISTORY_CONNECTION_CLOSED });
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
