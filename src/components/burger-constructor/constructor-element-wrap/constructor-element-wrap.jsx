import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { PropTypesForIngredient } from '../../../prop-types';
import clsx from 'clsx';

import { DataConstructorContext } from '../burger-context';
import styles from './constructor-element-wrap.module.css';

import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

const ConstructorElementWrap = React.memo(({ details, type, isLocked }) => {
  const { dataConstructor, setDataConstructor } = useContext(
    DataConstructorContext
  );

  const classForList = clsx(styles.item, 'mr-1 ml-4 pl-8');

  const onDelete = (id) => {
    setDataConstructor(dataConstructor.filter((item) => item._id !== id));
  };

  return (
    <li className={classForList}>
      {type !== 'top' && type !== 'bottom' && (
        <div className={styles.icon}>
          <DragIcon type="primary" />
        </div>
      )}
      <ConstructorElement
        id={details._id}
        type={type}
        isLocked={isLocked}
        handleClose={() => {
          onDelete(details._id);
        }}
        text={details.name}
        price={details.price}
        thumbnail={details.image}
      />
    </li>
  );
});

ConstructorElementWrap.propTypes = {
  details: PropTypes.shape(PropTypesForIngredient).isRequired,
  type: PropTypes.string,
  isLocked: PropTypes.bool,
};

export default ConstructorElementWrap;
