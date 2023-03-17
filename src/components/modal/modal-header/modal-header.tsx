import React, { FC } from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './modal-header.module.css';

export const ModalHeader: FC<{
  onClose: () => void;
  children: string;
  typeHeader: 'string' | 'number';
}> = React.memo(({ onClose, children, typeHeader }) => {
  const classForTitle =
    typeHeader === 'string'
      ? 'text text_type_main-large'
      : 'text text_type_digits-default';

  return (
    <div className={styles.header}>
      <span>
        <h1 className={classForTitle}>{children}</h1>
      </span>
      <div
        className={styles.cross}
        onClick={onClose}
        data-test-id="test-close-modal"
      >
        <CloseIcon type="primary" />
      </div>
    </div>
  );
});
