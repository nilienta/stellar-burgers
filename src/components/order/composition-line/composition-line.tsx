import React, { FC } from 'react';
import clsx from 'clsx';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { TIngredient } from '../../../services/types/types';
import styles from './composition-line.module.css';

export const CompositionLine: FC<{ item: TIngredient; count: number }> =
  React.memo(({ item, count }) => {
    return (
      <section className={styles.wrap}>
        <div className={styles.icon}>
          <img src={item.image_mobile} alt="" />
        </div>
        <p className={clsx('text text_type_main-default', styles.text)}>
          {item.name}
        </p>
        <div className={styles.price}>
          <p className="text text_type_digits-default">{`${count} x ${item.price}`}</p>
          <CurrencyIcon type="primary" />
        </div>
      </section>
    );
  });
