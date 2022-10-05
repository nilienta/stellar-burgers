import clsx from 'clsx';

import styles from './constructor-element-wrap.module.css';

import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const ConstructorElementWrap = (props) => {
  const classForList = clsx(styles.item, 'mr-1 ml-4 pl-8');

  return (
    <li className={classForList}>
      {props.type !== 'top' && props.type !== 'bottom' && (
        <div className={styles.icon}>
          <DragIcon type="primary" />
        </div>
      )}
      <ConstructorElement
        key={props._id}
        type={props.type}
        isLocked={props.isLocked}
        text={props.name}
        price={props.price}
        thumbnail={props.image}
      />
    </li>
  );
};

export default ConstructorElementWrap;
