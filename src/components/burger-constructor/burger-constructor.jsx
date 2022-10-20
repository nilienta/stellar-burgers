import { useState, useMemo, useEffect } from 'react';
import clsx from 'clsx';
import styles from './burger-constructor.module.css';

import Modal from '../modal/modal';
import ConstructorIngredientsList from './constructor-ingredients-list/constructor-ingredients-list';
import OrderDetails from './order-details/order-details';
import ConstructorElementWrap from './constructor-element-wrap/constructor-element-wrap';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import TotalPrice from './total-price/total-price';

import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import {
  SET_TOTAL_PRICE,
  MODIFY_CONSTRUCTOR_INGREDIENTS,
} from '../../services/actions/app';

const BurgerConstructor = () => {
  const classForFooter = clsx(styles.footer, 'mt-10 mr-3');

  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };
  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const dispatch = useDispatch();
  const { ingredients, currentBun, currentMainsAndSauces } = useSelector(
    (state) => state.app
  );

  useEffect(() => {
    let total = currentBun.price * 2;
    if (currentMainsAndSauces.length > 0) {
      currentMainsAndSauces.map((item) => (total += item.price));
      dispatch({
        type: SET_TOTAL_PRICE,
        totalPrice: total,
      });
    } else {
      dispatch({
        type: SET_TOTAL_PRICE,
        totalPrice: total,
      });
    }
  }, [currentBun, currentMainsAndSauces, dispatch]);

  const { v4: uuidv4 } = require('uuid');
  const [{ isHover }, dropTargetRef] = useDrop({
    accept: 'ingredient',
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(item) {
      dispatch({
        type: MODIFY_CONSTRUCTOR_INGREDIENTS,
        item: {
          ...item,
          dragId: uuidv4(),
        },
      });
    },
  });

  return (
    <article className={styles['burger-constructor']}>
      <section
        ref={dropTargetRef}
        className={`${isHover ? styles.onHover : styles.noHover}`}
      >
        <ConstructorElementWrap item={currentBun} type="top" isLocked={true} />
        <ConstructorIngredientsList />
        <ConstructorElementWrap
          item={currentBun}
          type="bottom"
          isLocked={true}
        />
      </section>

      <section className={classForFooter}>
        <TotalPrice />
        <Button
          type="primary"
          size="large"
          htmlType="button"
          onClick={handleOpenModal}
        >
          Оформить заказ
        </Button>
      </section>
      {modalVisible && (
        <Modal size="large" header="" onClose={handleCloseModal}>
          <OrderDetails />
        </Modal>
      )}
    </article>
  );
};

export default BurgerConstructor;
