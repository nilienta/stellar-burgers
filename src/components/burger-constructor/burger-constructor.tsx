import React, { useEffect, FC } from 'react';
import clsx from 'clsx';
import styles from './burger-constructor.module.css';

import { useDrop } from 'react-dnd';
import { useHistory } from 'react-router-dom';

import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import ConstructorIngredientsList from './constructor-ingredients-list/constructor-ingredients-list';
import OrderDetails from './order-details/order-details';
import ConstructorElementWrap from './constructor-element-wrap/constructor-element-wrap';
import TotalPrice from './order-details/total-price/total-price';
import CapConstructor from './cap-constructor/cap-constructor';

import {
  useAppDispatch,
  useAppSelector,
  TIngredient,
} from '../../services/types/types';
import {
  SET_TOTAL_PRICE,
  MODIFY_CONSTRUCTOR_INGREDIENTS,
  SET_VISIBLE_MODAL_CONSTRUCTOR,
  SET_INVISIBLE_MODAL_CONSTRUCTOR,
} from '../../services/actions/app';

const BurgerConstructor: FC = () => {
  const classForFooter = clsx(styles.footer, 'mt-10 mr-3');
  const classForBuns = clsx(styles.buns, 'text text_type_main-medium');

  const dispatch = useAppDispatch();

  const { currentBun, currentMainsAndSauces, isModalConstructorOpen } =
    useAppSelector((state) => state.app);

  const { isAuth } = useAppSelector((state) => state.auth);

  const history = useHistory();
  const handleOpenModal = () => {
    if (isAuth) {
      dispatch({
        type: SET_VISIBLE_MODAL_CONSTRUCTOR,
      });
    } else {
      //replace не сохраняет в историю страницу на которой нажата была кнопка (нельзя ходить по стрелочкам)
      history.push('/login');
    }
  };

  const handleCloseModal = () => {
    dispatch({
      type: SET_INVISIBLE_MODAL_CONSTRUCTOR,
    });
  };

  useEffect(() => {
    let total = currentBun.price! > 0 ? currentBun.price! * 2 : 0;
    if (currentMainsAndSauces.length > 0) {
      currentMainsAndSauces.map((item) => (total += item.price!));
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
    drop: (item: TIngredient) => {
      dispatch({
        type: MODIFY_CONSTRUCTOR_INGREDIENTS,
        item: {
          ...item,
          dragId: uuidv4(),
        },
      });
    },
  });

  const isDisableButton = Object.keys(currentBun).length === 0 ? true : false;
  const WrapBun = () => {
    return (
      <section className={styles['wrap-bun']}>
        <h1 className={classForBuns}>перенесите сюда булку</h1>
      </section>
    );
  };
  return (
    <article className={styles['burger-constructor']}>
      <section
        ref={dropTargetRef}
        className={`${isHover ? styles.onHover : styles.noHover}`}
      >
        {Object.keys(currentBun).length === 0 &&
        currentMainsAndSauces.length === 0 ? (
          <CapConstructor />
        ) : (
          <>
            {Object.keys(currentBun).length !== 0 ? (
              <ConstructorElementWrap
                item={currentBun}
                text={' (верх)'}
                type="top"
                isLocked={true}
              />
            ) : (
              <WrapBun />
            )}

            <ConstructorIngredientsList />
            {Object.keys(currentBun).length !== 0 ? (
              <ConstructorElementWrap
                item={currentBun}
                text={' (низ)'}
                type="bottom"
                isLocked={true}
              />
            ) : (
              <WrapBun />
            )}
          </>
        )}
      </section>
      {Object.keys(currentBun).length !== 0 ||
      currentMainsAndSauces.length !== 0 ? (
        <section className={classForFooter}>
          <TotalPrice />
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            onClick={handleOpenModal}
            disabled={isDisableButton}
          >
            Оформить заказ
          </Button>
        </section>
      ) : (
        ''
      )}
      {isModalConstructorOpen && (
        <Modal
          pSize="large"
          header=""
          typeHeader="string"
          onClose={handleCloseModal}
        >
          <OrderDetails />
        </Modal>
      )}
    </article>
  );
};

export default React.memo(BurgerConstructor);
