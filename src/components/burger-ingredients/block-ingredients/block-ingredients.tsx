import React, { FC } from 'react';
import clsx from 'clsx';

import { Ingredient } from '../ingredient/ingredient';
import type { TIngredient } from '../../../services/types/types';
import styles from './block-ingredients.module.css';

export const BlockIngredients: FC<{ thread: TIngredient[] }> = React.memo(
  ({ thread }) => {
    const classForList = clsx(styles.list, 'mt-6 mb-10 pr-1 pl-4');

    return (
      <ul className={classForList}>
        {thread.map((item) => {
          return <Ingredient key={item._id} item={item} />;
        })}
      </ul>
    );
  }
);
