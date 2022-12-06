import { FC, useEffect } from 'react';
import styles from './order-history.module.css';
import MenuProfile from '../../components/menu-profile/menu-profile';
import ListOrder from '../../components/list-order/list-order';
import { useAppSelector, useAppDispatch } from '../../utils/types';
import { WS_CONNECTION_START_TOKEN } from '../../services/actions/web-socket-token';
import { Redirect } from 'react-router-dom';

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

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START_TOKEN });
  }, [dispatch]);

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.main}>
          <article className="mt-20">
            <MenuProfile page="history" />
          </article>
          {orders !== undefined && orders.length > 0 ? (
            <ListOrder needStatus={true} list={orders} />
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default OrderHistoryPage;
