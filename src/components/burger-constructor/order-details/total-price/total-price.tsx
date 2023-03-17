import React, { FC } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { useAppSelector } from '../../../../services/types/types';
import styles from './total-price.module.css';

export const TotalPrice: FC = React.memo(() => {
  const { totalPrice } = useAppSelector((state) => state.app);
  return (
    <div className={styles.price}>
      <span className="text text_type_digits-medium">{totalPrice}</span>
      <CurrencyIcon type="primary" />
    </div>
  );
});
