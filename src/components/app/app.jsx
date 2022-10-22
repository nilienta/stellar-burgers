import { useEffect } from 'react';
import styles from './app.module.css';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import { getIngredients } from '../../services/actions/app';
import { useDispatch, useSelector } from 'react-redux';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BASE_URL } from '../../services/actions/app';

const App = () => {
  const { ingredientsRequest, ingredientsFailed } = useSelector(
    (state) => state.app
  );

  const NORMA_API = BASE_URL + '/ingredients';
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngredients(NORMA_API));
  }, []);

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        {!ingredientsRequest && !ingredientsFailed && (
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        )}
      </main>
    </>
  );
};

export default App;
