import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './burger-constructor.module.css';

import { PropTypesForDataList } from '../../prop-types.js';

import Modal from '../modal/modal';
import OrderDetails from './order-details/order-details';
import ConstructorElementWrap from './constructor-element-wrap/constructor-element-wrap.js';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import TotalPrice from './total-price/total-price';

const classForList = clsx(styles.list, 'custom-scroll', 'mt-4 mb-4');
const classForFooter = clsx(styles.footer, 'mt-10 mr-3');

const BurgerConstructor = ({ data }) => {
  const [state, setState] = React.useState(false);

  const handleOpenModal = () => {
    setState(true);
  };

  const handleCloseModal = () => {
    setState(false);
  };

  return (
    <article className={styles['burger-constructor']}>
      <ConstructorElementWrap details={data[0]} type="top" isLocked={true} />
      <ul className={classForList}>
        {data.map((item) => {
          return <ConstructorElementWrap details={item} key={item._id} />;
        })}
      </ul>
      <ConstructorElementWrap
        details={data[data.length - 1]}
        type="bottom"
        isLocked={true}
      />
      <section className={classForFooter}>
        <TotalPrice totalPrice={610} />
        <Button
          type="primary"
          size="large"
          htmlType="button"
          onClick={handleOpenModal}
        >
          Оформить заказ
        </Button>
      </section>
      {state && (
        <Modal size="large" header="" onClose={handleCloseModal}>
          <OrderDetails />
        </Modal>
      )}
    </article>
  );
};

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(PropTypesForDataList).isRequired,
};

export default BurgerConstructor;
