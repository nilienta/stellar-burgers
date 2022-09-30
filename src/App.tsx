import styles from './App.module.css';
import AppHeader from './components/app-header/app-header.js';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients.js';
import BurgerConstructor from './components/burger-constructor/burger-constructor.js';

import data from "./utils/data.js";

function App() {
  return (
    <>
	 <AppHeader />
	 <main className={styles.main}>
		<BurgerIngredients data={data}/>
		<BurgerConstructor data={data}/>
	 </main>
	 </>
  );
}

export default App;
