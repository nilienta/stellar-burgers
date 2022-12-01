import React, { FC } from 'react';
import clsx from 'clsx';
import styles from './order.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import CompositionLine from '../../components/composition-line/composition-line';

const OrderPage: FC = () => {
  return (
    <main className={styles.main}>
      <section className={styles.container}>
        <div className={styles['order-number']}>
          <p className="text text_type_digits-default mb-10">#034535</p>
        </div>
        <p className="text text_type_main-medium mb-3">
          Death Star Starship Main бургер
        </p>
        <p className="text text_type_main-default text_color_success mb-15">
          Создан
        </p>
        <p className="text text_type_main-medium mb-6">Состав:</p>
        <section className={clsx(styles.composition, 'custom-scroll', 'mb-10')}>
          <CompositionLine />
          <CompositionLine />
          <CompositionLine />
          <CompositionLine />
          <CompositionLine />
          <CompositionLine />
          <CompositionLine />
          <CompositionLine />
          <CompositionLine />
          <CompositionLine />
          <CompositionLine />
        </section>
        <div className={styles['data-line']}>
          <p className="text text_type_main-default text_color_inactive">
            Сегодня, 16:20
          </p>
          <div className={styles.price}>
            <p className="text text_type_digits-default">480</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </section>
    </main>
  );
};

export default React.memo(OrderPage);
