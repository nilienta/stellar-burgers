import React, { FC } from 'react';

import { TabWrap } from './tab-wrap/tab-wrap';
import { IngredientsList } from './ingredients-list/ingredients-list';
import styles from './burger-ingredients.module.css';

export const BurgerIngredients: FC = React.memo(() => {
  return (
    <article className={styles['burger-ingredients']}>
      <TabWrap />
      <IngredientsList />
    </article>
  );
});
