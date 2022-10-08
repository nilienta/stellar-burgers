import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { PropTypesForDataList } from '../../../prop-types';
import clsx from 'clsx';

import styles from './ingredients-list.module.css';

import Ingredient from '../ingredient/ingredient.js';

const IngredientsList = ({ data, open, srcClick, one, two, three }) => {
  const classForSection = clsx(styles['ingredient-list'], 'custom-scroll');
  const classForList = clsx(styles.list, 'mt-6 mb-10 pr-1 pl-4');

  const getOneType = (type) => {
    return useMemo(() => data.filter((item) => item.type === type), [data]);
  };

  const buns = getOneType('bun');
  const mains = getOneType('main');
  const sauces = getOneType('sauce');

  const Ingredients = ({ thread, open, srcClick }) => {
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

  Ingredients.propTypes = {
    thread: PropTypes.arrayOf(PropTypesForDataList).isRequired,
    open: PropTypes.func.isRequired,
    srcClick: PropTypes.func.isRequired,
    one: PropTypes.object,
    two: PropTypes.object,
    three: PropTypes.object,
  };

  return (
    <section className={classForSection}>
      <span className={styles.title} ref={one}>
        <h2 className="text text_type_main-medium">Булки</h2>
      </span>
      <Ingredients thread={buns} open={open} srcClick={srcClick} />
      <span className={styles.title} ref={two}>
        <h2 className="text text_type_main-medium">Соусы</h2>
      </span>
      <Ingredients thread={sauces} open={open} srcClick={srcClick} />
      <span className={styles.title} ref={three}>
        <h2 className="text text_type_main-medium">Начинки</h2>
      </span>
      <Ingredients thread={mains} open={open} srcClick={srcClick} />
    </section>
  );
};

IngredientsList.propTypes = {
  data: PropTypes.arrayOf(PropTypesForDataList).isRequired,
  open: PropTypes.func.isRequired,
  srcClick: PropTypes.func.isRequired,
};

export default IngredientsList;
