import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import styles from './ingredient.module.css';

import Modal from '../../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details.js';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const Ingredient = ({ item, count }) => {
  const [state, setState] = React.useState({
    visibleModal: false,
  });

  const handleOpenModal = () => {
    setState({ ...state, visibleModal: true });
  };

  const handleCloseModal = () => {
    setState({ ...state, visibleModal: false });
  };

  const classForPrice = clsx(styles.price, 'mt-1 mb-1');
  return (
    <>
      <li className={styles.ingredient} onClick={handleOpenModal}>
        <Counter count={count} size="default" />
        <img src={item.image} alt={item.type} width="240px" height="120px" />
        <div className={classForPrice}>
          <span className="text text_type_digits-default mr-2">
            {item.price}
          </span>
          <CurrencyIcon type="primary" />
        </div>
        <h3 className="text text_type_main-default">{item.name}</h3>
      </li>
      {state.visibleModal && (
        <Modal
          size="medium"
          header="Детали ингредиента"
          onClose={handleCloseModal}
        >
          <IngredientDetails details={item} />
        </Modal>
      )}
    </>
  );
};
Ingredient.propTypes = {
  count: PropTypes.number.isRequired,
};
export default Ingredient;
