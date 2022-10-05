import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';

import PropTypesForDataList from '../../prop-types.js';

import TabWrap from './tab-wrap/tab-wrap.js';
import IngredientsList from './ingredients-list/ingredients-list.js';

const BurgerIngredients = ({ data }) => {
  return (
    <article className={styles['burger-ingredients']}>
      <span className="mb-5">
        <h1 className="text text_type_main-large">Соберите бургер</h1>
      </span>
      <TabWrap />
      <IngredientsList data={data} />
    </article>
  );
};

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(PropTypesForDataList).isRequired,
};

export default BurgerIngredients;
