import { useSelector } from 'react-redux';
import styles from './total-price.module.css';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const TotalPrice = () => {
  const totalPrice = useSelector((state) => state.app.totalPrice);
  return (
    <div className={styles.price}>
      <span className="text text_type_digits-medium">{totalPrice}</span>
      <CurrencyIcon type="primary" />
    </div>
  );
};

export default TotalPrice;
