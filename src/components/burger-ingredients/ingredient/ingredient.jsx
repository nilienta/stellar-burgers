import clsx from 'clsx';
import PropTypes from 'prop-types';
import { PropTypesForIngredient } from '../../../prop-types';
import { useDispatch } from 'react-redux';
import { SET_VISIBLE_INGREDIENT } from '../../../services/actions/app';
import styles from './ingredient.module.css';
import { useDrag } from 'react-dnd';

import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

const Ingredient = ({ item, open }) => {
  const classForPrice = clsx(styles.price, 'mt-1 mb-1');

  const [{ opacity }, dragRef] = useDrag({
    type: 'ingredient',
    item: { ...item },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  const dispatch = useDispatch();
  const funcAssembly = () => {
    open();
    dispatch({
      type: SET_VISIBLE_INGREDIENT,
      visibleIngredient: item,
    });
  };

  return (
    <li
      className={styles.ingredient}
      onClick={funcAssembly}
      ref={dragRef}
      style={{ opacity }}
    >
      {item.count > 0 && <Counter count={item.count} size="default" />}
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
  open: PropTypes.func.isRequired,
};

export default Ingredient;
