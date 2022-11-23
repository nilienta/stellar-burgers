import React, { FC } from 'react';
import styles from './modal-overlay.module.css';
import clsx from 'clsx';

const ModalOverlay: FC<{ onClose: () => void }> = ({ onClose }) => {
  const classForOverlay = clsx(styles['module-overlay']);

  return <div className={classForOverlay} onClick={onClose}></div>;
};

export default React.memo(ModalOverlay);
