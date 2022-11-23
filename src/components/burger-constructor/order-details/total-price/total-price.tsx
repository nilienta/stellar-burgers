import React, { FC } from 'react';
import { useAppSelector } from '../../../../utils/types';
import styles from './total-price.module.css';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const TotalPrice: FC = () => {
  const { totalPrice } = useAppSelector((state) => state.app);
  return (
    <div className={styles.price}>
      <span className="text text_type_digits-medium">{totalPrice}</span>
      <CurrencyIcon type="primary" />
    </div>
  );
};

export default React.memo(TotalPrice);
