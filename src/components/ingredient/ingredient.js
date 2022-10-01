import clsx from 'clsx';

import styles from './ingredient.module.css';

import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const Ingredient = (props) => {
  const classForPrice = clsx(styles.price, 'mt-1 mb-1');
  return (
    <li className={styles.ingredient}>
      <Counter count={props.count} size="default" />
      <img src={props.image} alt={props.type} width="240px" height="120px" />
      <div className={classForPrice}>
        <span className="text text_type_digits-default mr-2">
          {props.price}
        </span>
        <CurrencyIcon type="primary" />
      </div>
      <h3 className="text text_type_main-default">{props.name}</h3>
    </li>
  );
};

export default Ingredient;
