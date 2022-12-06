import styles from './home.module.css';
import { FC } from 'react';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';

import { useAppSelector, TIngredient } from '../../services/types/types';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const HomePage: FC = () => {
  const { ingredients } = useAppSelector((state) => state.app);

  return (
    <main className={styles.main}>
      {ingredients.length > 0 && (
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      )}
    </main>
  );
};

export default HomePage;
