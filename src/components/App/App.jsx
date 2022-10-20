import { useEffect } from 'react';
import styles from './App.module.css';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import { getIngredients } from '../../services/actions/app';
import { useDispatch, useSelector } from 'react-redux';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const NORMA_API = 'https://norma.nomoreparties.space/api/ingredients';

const App = () => {
  const { ingredientsRequest, ingredientsFailed } = useSelector(
    (state) => state.app
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngredients(NORMA_API));
  }, []);

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        {!ingredientsRequest && !ingredientsFailed && (
          <>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor />
            </DndProvider>
          </>
        )}
      </main>
    </>
  );
};

export default App;
