import React, { useState } from 'react';
import styles from './App.module.css';

import { CheckResponseContext, DataContext } from './app-context';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

const NORMA_API = 'https://norma.nomoreparties.space/api/ingredients';

const App = () => {
  const [state, setState] = React.useState({
    isLoading: true,
    hasError: false,
  });
  const [data, setData] = useState([]);

  const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
  };

  const getIngredients = (URL_API) => {
    fetch(URL_API)
      .then((res) => checkResponse(res))
      .then((res) => setData(res.data))
      .catch((e) =>
        setState((state) => {
          return { ...state, hasError: true };
        })
      )
      .finally(() =>
        setState((state) => {
          return { ...state, isLoading: false };
        })
      );
  };
  React.useEffect(() => {
    getIngredients(NORMA_API);
  }, []);

  return (
    <>
      <CheckResponseContext.Provider value={{ checkResponse }}>
        <AppHeader />
        <main className={styles.main}>
          {!state.isLoading && !state.hasError && (
            <>
              <BurgerIngredients data={data} />
              <DataContext.Provider value={{ data, setData }}>
                <BurgerConstructor />
              </DataContext.Provider>
            </>
          )}
        </main>
      </CheckResponseContext.Provider>
    </>
  );
};

export default App;
