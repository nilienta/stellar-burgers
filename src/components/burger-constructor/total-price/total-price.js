import PropTypes from 'prop-types';

import styles from './total-price.module.css';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const TotalPrice = ({ totalPrice }) => {
  return (
    <div className={styles.price}>
      <span className="text text_type_digits-medium">{totalPrice}</span>
      <CurrencyIcon type="primary" />
    </div>
  );
};

TotalPrice.propTypes = {
  totalPrice: PropTypes.number.isRequired,
};

export default TotalPrice;
