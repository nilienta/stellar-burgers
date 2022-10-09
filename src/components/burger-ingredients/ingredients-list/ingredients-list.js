import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { PropTypesForDataList } from '../../../prop-types';
import clsx from 'clsx';

import styles from './ingredients-list.module.css';

import BlockIngredients from '../block-ingredients/block-ingredients';

const IngredientsList = ({ data, open, srcClick, one, two, three }) => {
  const classForSection = clsx(styles['ingredient-list'], 'custom-scroll');

  const { buns, mains, sauces } = useMemo(
    () => ({
      buns: data.filter((item) => item.type === 'bun'),
      mains: data.filter((item) => item.type === 'main'),
      sauces: data.filter((item) => item.type === 'sauce'),
    }),
    [data]
  );

  return (
    <section className={classForSection}>
      <span className={styles.title} ref={one}>
        <h2 className="text text_type_main-medium">Булки</h2>
      </span>
      <BlockIngredients thread={buns} open={open} srcClick={srcClick} />
      <span className={styles.title} ref={two}>
        <h2 className="text text_type_main-medium">Соусы</h2>
      </span>
      <BlockIngredients thread={sauces} open={open} srcClick={srcClick} />
      <span className={styles.title} ref={three}>
        <h2 className="text text_type_main-medium">Начинки</h2>
      </span>
      <BlockIngredients thread={mains} open={open} srcClick={srcClick} />
    </section>
  );
};

IngredientsList.propTypes = {
  data: PropTypes.arrayOf(PropTypesForDataList).isRequired,
  open: PropTypes.func.isRequired,
  srcClick: PropTypes.func.isRequired,
  one: PropTypes.object.isRequired,
  two: PropTypes.object.isRequired,
  three: PropTypes.object.isRequired,
};

export default IngredientsList;
