import React, { FC } from 'react';
import clsx from 'clsx';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useLocation, Link } from 'react-router-dom';

import {
  getStatus,
  getTotalPriceForOrder,
  getArrayOrderIngredients,
} from '../../../utils/order-processing';
import { setTime } from '../../../utils/date';
import { TCurrentOrder } from '../../../services/types/types';
import styles from './order-line.module.css';

export const OrderLine: FC<{ needStatus: boolean; order: TCurrentOrder }> =
  React.memo(({ needStatus, order }) => {
    const arrIngredients = getArrayOrderIngredients(order);
    const unique = Array.from(new Set(arrIngredients));
    const status = getStatus(order.status);

    const totalPrice = getTotalPriceForOrder(order);

    const location = useLocation();

    const NumberAndDate = () => {
      return (
        <div className={styles['data-line']}>
          <p className="text text_type_digits-default">{`#${order.number}`}</p>
          <p className="text text_type_main-default text_color_inactive">
            {setTime(order.createdAt)}
          </p>
        </div>
      );
    };
    const TitleAndStatus = () => {
      return (
        <div className={styles.info}>
          <p className="text text_type_main-medium">{order.name}</p>
          {needStatus ? status : <></>}
        </div>
      );
    };
    const Icons = () => {
      return (
        <div className={styles.icons}>
          {unique.reverse().map((src, index) => {
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
      );
    };
    const TotalPrice = () => {
      return (
        <div className={styles.price}>
          <p className="text text_type_digits-default">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      );
    };

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
              <NumberAndDate />
              <TitleAndStatus />
              <div className={styles['data-line']}>
                <Icons />
                <TotalPrice />
              </div>
            </section>
          </Link>
        ) : (
          ''
        )}
      </>
    );
  });
