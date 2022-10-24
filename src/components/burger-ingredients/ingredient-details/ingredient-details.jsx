import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

import clsx from 'clsx';
import styles from './ingredient-details.module.css';

const Element = ({ name, count }) => {
  const classForElement = clsx(
    styles.element,
    'text text_type_main-default text_color_inactive'
  );
  return (
    <li className={classForElement}>
      <span>{name}</span>
      <span className="text text_type_digits-default">{count}</span>
    </li>
  );
};

const Composition = () => {
  const { visibleIngredient } = useSelector((state) => state.app);
  return (
    <ul className={styles['composition-list']}>
      <Element name="Калории,ккал" count={visibleIngredient.calories} />
      <Element name="Белки, г" count={visibleIngredient.proteins} />
      <Element name="Жиры, г" count={visibleIngredient.fat} />
      <Element name="Углеводы, г" count={visibleIngredient.carbohydrates} />
    </ul>
  );
};

const IngredientDetails = () => {
  const classForDescription = clsx(styles.description, 'mt-4 mb-8');
  const { visibleIngredient } = useSelector((state) => state.app);

  return (
    <section className={styles['ingredient-details']}>
      <img
        src={visibleIngredient.image_large}
        alt={visibleIngredient.name}
        width="480"
        height="240"
      ></img>
      <div className={classForDescription}>
        <h2 className="text text_type_main-medium">{visibleIngredient.name}</h2>
      </div>
      <div className="composition">
        <Composition />
      </div>
    </section>
  );
};

Element.propTypes = {
  name: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
};

export default IngredientDetails;
