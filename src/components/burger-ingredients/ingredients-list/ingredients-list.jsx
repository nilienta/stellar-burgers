import { useMemo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { Element } from 'react-scroll';
import { useSelector } from 'react-redux';

import styles from './ingredients-list.module.css';

import BlockIngredients from '../block-ingredients/block-ingredients';

const IngredientsList = ({ open }) => {
  const classForSection = clsx(styles['ingredient-list'], 'custom-scroll');

  const { ingredients } = useSelector((state) => state.app);

  const { buns, mains, sauces } = useMemo(
    () => ({
      buns: ingredients.filter((item) => item.type === 'bun'),
      mains: ingredients.filter((item) => item.type === 'main'),
      sauces: ingredients.filter((item) => item.type === 'sauce'),
    }),
    [ingredients]
  );

  return (
    <section className={classForSection} id="containerElement">
      <Element name="buns">
        <span className={styles.title} id="bun">
          <h2 className="text text_type_main-medium">Булки</h2>
        </span>
        <BlockIngredients thread={buns} open={open} />
      </Element>

      <Element name="sauces">
        <span className={styles.title} id="sauce">
          <h2 className="text text_type_main-medium">Соусы</h2>
        </span>
        <BlockIngredients thread={sauces} open={open} />
      </Element>

      <Element name="mains">
        <span className={styles.title} id="main">
          <h2 className="text text_type_main-medium">Начинки</h2>
        </span>
        <BlockIngredients thread={mains} open={open} />
      </Element>
    </section>
  );
};

IngredientsList.propTypes = {
  open: PropTypes.func.isRequired,
};

export default IngredientsList;
