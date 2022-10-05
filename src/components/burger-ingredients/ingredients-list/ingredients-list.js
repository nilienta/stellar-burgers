import clsx from 'clsx';

import styles from './ingredients-list.module.css';

import Ingredient from '../ingredient/ingredient.js';

const IngredientsList = ({ data }) => {
  const classForSection = clsx(styles['ingredient-list'], 'custom-scroll');
  const classForList = clsx(styles.list, 'mt-6 mb-10 pr-1 pl-4');

  const buns = data.filter((item) => item.type === 'bun');
  const mains = data.filter((item) => item.type === 'main');
  const sauces = data.filter((item) => item.type === 'sauce');

  const Ingredients = ({ thread }) => (
    <ul className={classForList}>
      {thread.map((item) => {
        return <Ingredient key={item._id} count={2} item={item} />;
      })}
    </ul>
  );

  return (
    <section className={classForSection}>
      <span className={styles.title}>
        <h2 className="text text_type_main-medium">Булки</h2>
      </span>
      <Ingredients thread={buns} />
      <span className={styles.title}>
        <h2 className="text text_type_main-medium">Соусы</h2>
      </span>
      <Ingredients thread={sauces} />
      <span className={styles.title}>
        <h2 className="text text_type_main-medium">Начинки</h2>
      </span>
      <Ingredients thread={mains} />
    </section>
  );
};

export default IngredientsList;
