import React from 'react';
import PropTypes from 'prop-types';
import { PropTypesForDataList } from '../../../prop-types';

import clsx from 'clsx';

import styles from './block-ingredients.module.css';
import Ingredient from '../ingredient/ingredient';

const BlockIngredients = ({ thread }) => {
  const classForList = clsx(styles.list, 'mt-6 mb-10 pr-1 pl-4');

  return (
    <ul className={classForList}>
      {thread.map((item) => {
        return <Ingredient key={item._id} item={item} />;
      })}
    </ul>
  );
};

BlockIngredients.propTypes = {
  thread: PropTypes.arrayOf(PropTypesForDataList).isRequired,
};

export default React.memo(BlockIngredients);
