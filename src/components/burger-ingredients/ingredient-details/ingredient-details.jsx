import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getIngredients } from '../../../services/actions/app';
import clsx from 'clsx';
import styles from './ingredient-details.module.css';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../../../services/actions/app';

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

const IngredientDetails = () => {
  const classForDescription = clsx(styles.description, 'mt-4 mb-8');

  const dispatch = useDispatch();
  const NORMA_API = BASE_URL + '/ingredients';
  useEffect(() => {
    dispatch(getIngredients(NORMA_API));
  }, []);
  const { ingredients } = useSelector((state) => state.app);

  const { id } = useParams();
  const currentItem = ingredients.find((elem) => elem._id == id);

  return (
    <>
      {ingredients.length > 0 && (
        <section className={styles['ingredient-details']}>
          <img
            src={currentItem.image_large}
            alt={currentItem.name}
            width="480"
            height="240"
          ></img>
          <div className={classForDescription}>
            <h2 className="text text_type_main-medium">{currentItem.name}</h2>
          </div>
          <div className="composition">
            <ul className={styles['composition-list']}>
              <Element name="Калории,ккал" count={currentItem.calories} />
              <Element name="Белки, г" count={currentItem.proteins} />
              <Element name="Жиры, г" count={currentItem.fat} />
              <Element name="Углеводы, г" count={currentItem.carbohydrates} />
            </ul>
          </div>
        </section>
      )}
    </>
  );
};

Element.propTypes = {
  name: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
};

export default IngredientDetails;
