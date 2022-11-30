import React, { FC } from 'react';
import styles from './stats.module.css';
import clsx from 'clsx';

const Stats: FC = () => {
  return (
    <article className={styles.container}>
      <section className={styles['order-number']}>
        <section className={styles.column}>
          <p className="text text_type_main-medium mb-6">Готовы:</p>
          <div className={styles['list-number']}>
            <p className="text text_type_digits-default text_color_success mb-2">
              034533
            </p>
            <p className="text text_type_digits-default text_color_success mb-2">
              034533
            </p>
            <p className="text text_type_digits-default text_color_success mb-2">
              034533
            </p>
            <p className="text text_type_digits-default text_color_success mb-2">
              034533
            </p>
            <p className="text text_type_digits-default text_color_success mb-2">
              034553
            </p>
            <p className="text text_type_digits-default text_color_success mb-2">
              036533
            </p>
            <p className="text text_type_digits-default text_color_success mb-2">
              564533
            </p>
            <p className="text text_type_digits-default text_color_success mb-2">
              034533
            </p>
            <p className="text text_type_digits-default text_color_success mb-2">
              034553
            </p>
            <p className="text text_type_digits-default text_color_success mb-2">
              036533
            </p>
            <p className="text text_type_digits-default text_color_success mb-2">
              564533
            </p>
            <p className="text text_type_digits-default text_color_success mb-2">
              034533
            </p>
            <p className="text text_type_digits-default text_color_success mb-2">
              034553
            </p>
            <p className="text text_type_digits-default text_color_success mb-2">
              036533
            </p>
            <p className="text text_type_digits-default text_color_success mb-2">
              564533
            </p>
          </div>
        </section>
        <section className={styles.column}>
          <p className="text text_type_main-medium mb-6">В работе:</p>
          <div className={styles['list-number']}>
            <p className="text text_type_digits-default mb-2">034533</p>
            <p className="text text_type_digits-default mb-2">034553</p>
            <p className="text text_type_digits-default mb-2">036533</p>
            <p className="text text_type_digits-default mb-2">564533</p>
          </div>
        </section>
      </section>
      <section className={styles.row}>
        <p className="text text_type_main-medium mb-6">
          Выполнено за все время:
        </p>
        <p className={clsx('text text_type_digits-large', styles.number)}>
          28 752
        </p>
      </section>
      <section className={styles.row}>
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
        <p className={clsx('text text_type_digits-large', styles.number)}>
          138
        </p>
      </section>
    </article>
  );
};

export default React.memo(Stats);
