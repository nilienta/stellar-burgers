import { FC } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { BurgerIngredients } from '../../components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../../components/burger-constructor/burger-constructor';
import { useAppSelector } from '../../services/types/types';
import { Head } from '../../components/head/head';
import styles from './home.module.css';

export const HomePage: FC = () => {
  const { ingredients } = useAppSelector((state) => state.app);

  return (
    <>
      <Head title="Конструктор - Stellar-Burgers" />
      {ingredients.length > 0 && (
        <main className={styles.main}>
          <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
          <div className={styles.wrap}>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor />
            </DndProvider>
          </div>
        </main>
      )}
    </>
  );
};
