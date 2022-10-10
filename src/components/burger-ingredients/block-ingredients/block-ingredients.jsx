import PropTypes from 'prop-types';
import { PropTypesForDataList } from '../../../prop-types';

import clsx from 'clsx';

import styles from './block-ingredients.module.css';
import Ingredient from '../ingredient/ingredient.js';

const classForList = clsx(styles.list, 'mt-6 mb-10 pr-1 pl-4');

const BlockIngredients = ({ thread, open, srcClick }) => {
	return (
	  <ul className={classForList}>
		 {thread.map((item) => {
			return (
			  <Ingredient
				 key={item._id}
				 count={2}
				 item={item}
				 open={open}
				 srcClick={srcClick}
			  />
			);
		 })}
	  </ul>
	);
 };

 BlockIngredients.propTypes = {
	thread: PropTypes.arrayOf(PropTypesForDataList).isRequired,
	open: PropTypes.func.isRequired,
	srcClick: PropTypes.func.isRequired,
 };

 export default BlockIngredients