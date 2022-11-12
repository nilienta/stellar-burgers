import React from 'react';
import styles from './burger-ingredients.module.css';
import TabWrap from './tab-wrap/tab-wrap';
import IngredientsList from './ingredients-list/ingredients-list';

const BurgerIngredients = () => {
  return (
    <article className={styles['burger-ingredients']}>
      <span className="mb-5">
        <h1 className="text text_type_main-large">Соберите бургер</h1>
      </span>
      <TabWrap />
      <IngredientsList />
    </article>
  );
};

export default React.memo(BurgerIngredients);
