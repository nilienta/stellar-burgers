import React, { FC } from 'react';
import styles from './composition-line.module.css';
import clsx from 'clsx';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const CompositionLine: FC = () => {
  return (
    <section className={styles.wrap}>
      <div className={styles.icon}>
        <img
          src="https://code.s3.yandex.net/react/code/bun-02-mobile.png"
          alt=""
        />
      </div>
      <p className={clsx('text text_type_main-default', styles.text)}>
        Флюоресцентная булка R2-D3
      </p>
      <div className={styles.price}>
        <p className="text text_type_digits-default">2 x 20</p>
        <CurrencyIcon type="primary" />
      </div>
    </section>
  );
};

export default React.memo(CompositionLine);
