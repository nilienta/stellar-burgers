import React, { FC } from 'react';
import styles from './burger-ingredients.module.css';
import TabWrap from './tab-wrap/tab-wrap';
import IngredientsList from './ingredients-list/ingredients-list';

const BurgerIngredients: FC = () => {
  return (
    <article className={styles['burger-ingredients']}>
      <TabWrap />
      <IngredientsList />
    </article>
  );
};

export default React.memo(BurgerIngredients);
