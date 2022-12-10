import React, { FC } from 'react';
import clsx from 'clsx';
import styles from './order-line.module.css';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { useLocation, Link } from 'react-router-dom';
import {
  getStatus,
  getTotalPriceForOrder,
  getArrayOrderIngredients,
} from '../../../utils/order-processing';
import setTime from '../../../utils/date';
import { TIngredient, TCurrentOrder } from '../../../services/types/types';

const OrderLine: FC<{ needStatus: boolean; order: TCurrentOrder }> = ({
  needStatus,
  order,
}) => {
  const arrIngredients = getArrayOrderIngredients(order);
  const unique = Array.from(new Set(arrIngredients));
  const status = getStatus(order.status);

  const totalPrice = getTotalPriceForOrder(order);

  const location = useLocation();

  return (
    <>
      {unique.length > 0 ? (
        <Link
          key={order._id}
          to={{
            pathname: `${location.pathname}/${order._id}`,
            state: { background: location },
          }}
          className={styles.link}
        >
          <section className={styles.container}>
            <div className={styles['data-line']}>
              <p className="text text_type_digits-default">{`#${order.number}`}</p>
              <p className="text text_type_main-default text_color_inactive">
                {setTime(order.createdAt)}
              </p>
            </div>
            <div className={styles.info}>
              <p className="text text_type_main-medium">{order.name}</p>
              {needStatus ? status : <></>}
            </div>
            <div className={styles['data-line']}>
              <div className={styles.icons}>
                {unique.reverse().map((src: TIngredient, index: number) => {
                  const otherItem = unique.length - 5;
                  if (index < 6) {
                    return (
                      <span
                        className={
                          index === 0
                            ? clsx(styles.icon, styles['icon-last'])
                            : styles.icon
                        }
                        key={index}
                      >
                        {unique.length > 6 && index === 0 ? (
                          <>
                            <span>{`+${otherItem}`}</span>
                            <img src={src.image_mobile} />
                          </>
                        ) : (
                          <img src={src.image_mobile} />
                        )}
                      </span>
                    );
                  }
                })}
              </div>
              <div className={styles.price}>
                <p className="text text_type_digits-default">{totalPrice}</p>
                <CurrencyIcon type="primary" />
              </div>
            </div>
          </section>
        </Link>
      ) : (
        ''
      )}
    </>
  );
};

export default React.memo(OrderLine);
