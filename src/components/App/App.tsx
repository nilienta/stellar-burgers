import React from 'react';
import styles from './App.module.css';

import AppHeader from '../app-header/app-header.js';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.js';
import BurgerConstructor from '../burger-constructor/burger-constructor.js';

const NORMA_API = 'https://norma.nomoreparties.space/api/ingredients';

const App = () => {
	const [state, setState] = React.useState({
		isLoading: true,
		hasError: false,
		data: [],
	});

	const checkReponse = (res: any) => {
		return res.ok ? res.json() : res.json().then((err: any) => Promise.reject(err));
	 };

	const getIngridients = (URL_API:any) => {
			fetch(URL_API)
			.then(res => checkReponse(res))
			.then	(res => setState((state) => {
				return {...state, data: res.data}
			 }))
			.catch (e => setState((state) => {
				return {...state, hasError: true }}))
			.finally (() => setState((state) => {
				return {...state, isLoading: false }
			 }))
		}
	React.useEffect(() => {getIngridients(NORMA_API)},[]);

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
