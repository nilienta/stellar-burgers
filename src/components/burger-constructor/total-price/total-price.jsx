import { useContext } from 'react';

import styles from './total-price.module.css';
import { TotalPriceContext } from '../burger-context';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const TotalPrice = () => {
  const { totalPrice } = useContext(TotalPriceContext);
  return (
    <div className={styles.price}>
      <span className="text text_type_digits-medium">
        {totalPrice.totalPrice}
      </span>
      <CurrencyIcon type="primary" />
    </div>
  );
};

export default TotalPrice;
