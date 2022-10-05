import React from 'react';
import styles from './App.module.css';

import AppHeader from '../app-header/app-header.js';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.js';
import BurgerConstructor from '../burger-constructor/burger-constructor.js';

const SRC_DATA = 'https://norma.nomoreparties.space/api/ingredients';

const App = () => {
	const [state, setState] = React.useState({
		isLoading: true,
		hasError: false,
		data: [],
	});

	const getIngridients = () => {
			fetch(SRC_DATA)
			.then (res => res.json())
			.then	(res => setState({...state, data: res.data, isLoading: false}))
			.catch (e => setState({...state, hasError: true, isLoading: false}))
		}
	React.useEffect(() => {getIngridients()},[]);

	return (
		<>
			<AppHeader />
			<main className={styles.main}>
				{ !state.isLoading && !state.hasError && 
				<><BurgerIngredients data={state.data} />
				<BurgerConstructor data={state.data} /></>
				}
			</main>
		</>
	);
}

export default App;
