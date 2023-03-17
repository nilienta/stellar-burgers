import { FC } from 'react';
import { useLocation } from 'react-router-dom';

import { IngredientDetails } from '../../components/burger-ingredients/ingredient-details/ingredient-details';
import styles from './ingredient-page.module.css';

type LocationState = {
  background?: Location;
};

export const IngredientPage: FC = () => {
  const location = useLocation<LocationState>();
  const background = location.state && location.state.background;
  return (
    <>
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
