import React, { FC } from 'react';
import clsx from 'clsx';

import styles from './modal-overlay.module.css';

export const ModalOverlay: FC<{ onClose: () => void }> = React.memo(
  ({ onClose }) => {
    const classForOverlay = clsx(styles['module-overlay']);

    return <div className={classForOverlay} onClick={onClose}></div>;
  }
);
