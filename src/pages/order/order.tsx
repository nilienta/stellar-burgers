import { FC, useEffect } from 'react';
import styles from './order.module.css';
import Order from '../../components/order/order';
import { useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../services/types/types';
import { WS_CONNECTION_START_TOKEN } from '../../services/actions/web-socket-token';
import { WS_CONNECTION_START } from '../../services/actions/web-socket';
import { searchItemById } from '../../utils/order-processing';
import { getCookie } from '../../utils/cookie';
import { useParams } from 'react-router-dom';

type LocationState = {
  background?: Location;
};

const OrderPage: FC = () => {
  const location = useLocation<LocationState>();
  const background = location.state && location.state.background;
  const { id }: { id: string } = useParams();
  const order = searchItemById(id);
  const accessToken = getCookie('accessToken');

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START, payload: '/all' });
    dispatch({
      type: WS_CONNECTION_START_TOKEN,
      payload: `?token=${accessToken}`,
    });
  }, [dispatch]);

  // TODO закрыть соединение после нахождение заказа
  return (
    <>
      {!background ? (
        order && (
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
        )
      ) : (
        <></>
      )}
    </>
  );
};

export default OrderPage;
