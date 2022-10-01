import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';

import TabWrap from '../tab-wrap/tab-wrap.js';
import IngredientsList from '../ingredients-list/ingredients-list.js';

const BurgerIngredients = (props) => {
  return (
    <article className={styles['burger-ingredients']}>
      <span className="mb-5">
        <h1 className="text text_type_main-large">Соберите бургер</h1>
      </span>
      <TabWrap />
      <IngredientsList data={props.data} />
    </article>
  );
};
const BurgerIngredientsPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  count: PropTypes.number,
});
BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(BurgerIngredientsPropTypes).isRequired,
};

export default BurgerIngredients;
