import { useEffect } from 'react';
import styles from './home.module.css';

import Header from '../../components/header/header';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';

import { getIngredients } from '../../services/actions/app';
import { useDispatch, useSelector } from 'react-redux';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BASE_URL } from '../../services/actions/app';

const HomePage = () => {
  const { ingredients } = useSelector((state) => state.app);

  const NORMA_API = BASE_URL + '/ingredients';
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngredients(NORMA_API));
  }, []);

  return (
    <>
      <Header />
      <main className={styles.main}>
        {ingredients.length > 0 && (
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        )}
      </main>
    </>
  );
};

export default HomePage;
