import { FC } from 'react';
import { useLocation } from 'react-router-dom';

import { IngredientDetails } from '../../components/burger-ingredients/ingredient-details/ingredient-details';
import { Head } from '../../components/head/head';
import styles from './ingredient-page.module.css';

type LocationState = {
  background?: Location;
};

export const IngredientPage: FC = () => {
  const location = useLocation<LocationState>();
  const background = location.state && location.state.background;
  return (
    <>
      {/* TODO  отображать конкретный ингредиент */}
      <Head title="Детали ингредиента - Stellar-Burgers" />
      {!background ? (
        <article className={styles.wrap}>
          <h1 className={`${styles.title} text text_type_main-large`}>
            Детали ингредиента
          </h1>
          <IngredientDetails />
        </article>
      ) : (
        <></>
      )}
    </>
  );
};
