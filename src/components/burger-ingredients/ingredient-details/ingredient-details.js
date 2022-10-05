import clsx from 'clsx';
import styles from './ingredient-details.module.css';

const classForElement = clsx(
  styles.element,
  'text text_type_main-default text_color_inactive'
);
const classForDescription = clsx(styles.description, 'mt-4 mb-8');

const Element = ({ name, count }) => {
  return (
    <li className={classForElement}>
      <span>{name}</span>
      <span className="text text_type_digits-default">{count}</span>
    </li>
  );
};

const Composition = ({ elements }) => {
  return (
    <ul className={styles['composition-list']}>
      <Element name="Калории,ккал" count={elements.calories} />
      <Element name="Белки, г" count={elements.proteins} />
      <Element name="Жиры, г" count={elements.fat} />
      <Element name="Углеводы, г" count={elements.carbohydrates} />
    </ul>
  );
};

const IngredientDetails = ({ details }) => {
  return (
    <section className={styles['ingredient-details']}>
      <img
        src={details.image_large}
        alt={details.name}
        width="480"
        height="240"
      ></img>
      <div className={classForDescription}>
        <h2 className="text text_type_main-medium">{details.name}</h2>
      </div>
      <div className="composition">
        <Composition elements={details} />
      </div>
    </section>
  );
};

export default IngredientDetails;
