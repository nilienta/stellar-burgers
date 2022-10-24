import PropTypes from 'prop-types';
import { PropTypesForDataList } from '../../../prop-types';

import clsx from 'clsx';

import styles from './block-ingredients.module.css';
import Ingredient from '../ingredient/ingredient';

const BlockIngredients = ({ thread, open }) => {
  const classForList = clsx(styles.list, 'mt-6 mb-10 pr-1 pl-4');

  return (
    <ul className={classForList}>
      {thread.map((item) => {
        return <Ingredient key={item._id} item={item} open={open} />;
      })}
    </ul>
  );
};

BlockIngredients.propTypes = {
  thread: PropTypes.arrayOf(PropTypesForDataList).isRequired,
  open: PropTypes.func.isRequired,
};

export default BlockIngredients;
