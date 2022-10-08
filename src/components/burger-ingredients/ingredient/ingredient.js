import clsx from 'clsx';
import PropTypes from 'prop-types';
import { PropTypesForIngredient } from '../../../prop-types';

import styles from './ingredient.module.css';

import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const Ingredient = ({ item, count, open, srcClick }) => {
  const classForPrice = clsx(styles.price, 'mt-1 mb-1');
  const funcAssembly = () => {
    open();
    srcClick(item);
  };
  return (
    <li className={styles.ingredient} onClick={funcAssembly}>
      <Counter count={count} size="default" />
      <img src={item.image} alt={item.type} width="240px" height="120px" />
      <div className={classForPrice}>
        <span className="text text_type_digits-default mr-2">{item.price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <h3 className="text text_type_main-default">{item.name}</h3>
    </li>
  );
};

Ingredient.propTypes = {
  item: PropTypes.shape(PropTypesForIngredient).isRequired,
  count: PropTypes.number.isRequired,
  open: PropTypes.func.isRequired,
  srcClick: PropTypes.func.isRequired,
};

export default Ingredient;
