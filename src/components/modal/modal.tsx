import React, { useEffect, FC, SyntheticEvent } from 'react';
import ReactDOM from 'react-dom';

import clsx from 'clsx';
import styles from './modal.module.css';

import ModalOverlay from './modalOverlay/modal-overlay';
import ModalHeader from './modal-header/modal-header';

type TModal = {
  size: string;
  header: string;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: FC<TModal> = ({ size, header, onClose, children }) => {
  const modalRoot = document.getElementById('modal-root');
  const classForModalM = clsx(
    styles.modal,
    styles['modal-open'],
    'pt-10 pr-10 pb-15 pl-10'
  );
  const classForModalL = clsx(
    styles.modal,
    styles['modal-open'],
    'pt-15 pr-10 pb-30 pl-10'
  );

  useEffect(() => {
    const handleESCclose = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.body.addEventListener('keyup', handleESCclose);
    return () => document.body.removeEventListener('keyup', handleESCclose);
  }, []);

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClose={onClose} />
      <div className={size === 'medium' ? classForModalM : classForModalL}>
        <ModalHeader onClose={onClose}>{header}</ModalHeader>
        {children}
      </div>
    </>,
    modalRoot as Element
  );
};

export default React.memo(Modal);
