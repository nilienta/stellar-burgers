import React, { useEffect, FC } from 'react';
import ReactDOM from 'react-dom';

import clsx from 'clsx';
import styles from './modal.module.css';

import ModalOverlay from './modalOverlay/modal-overlay';
import ModalHeader from './modal-header/modal-header';
import { useParams } from 'react-router-dom';
import { searchItemById } from '../../utils/order-processing';

type TModal = {
  pSize: string;
  header: string;
  onClose: () => void;
  children: React.ReactNode;
  typeHeader: 'string' | 'number';
};

const Modal: FC<TModal> = ({
  pSize,
  header,
  typeHeader,
  onClose,
  children,
}) => {
  const modalRoot = document.getElementById('modal-root');

  const classForModalS = clsx(
    styles.modal,
    styles['modal-open'],
    'pt-15 pr-10 pb-10 pl-10'
  );
  const classForModalM = clsx(
    styles.modal,
    styles['modal-open'],
    'pt-15 pr-10 pb-15 pl-10'
  );
  const classForModalL = clsx(
    styles.modal,
    styles['modal-open'],
    'pt-15 pr-10 pb-30 pl-10'
  );
  let currentSize: string;
  if (pSize === 'small') {
    currentSize = classForModalS;
  } else if (pSize === 'medium') {
    currentSize = classForModalM;
  } else {
    currentSize = classForModalL;
  }

  let headerText: string = header;
  if (header === 'ID') {
    const { id }: { id: string } = useParams();

    // FIXME сделать асинхронную функцию
    const item = searchItemById(id);
    headerText = `#${item!.number}`;
  }

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
      <div className={currentSize}>
        <ModalHeader onClose={onClose} typeHeader={typeHeader}>
          {headerText}
        </ModalHeader>
        {children}
      </div>
    </>,
    modalRoot as Element
  );
};

export default React.memo(Modal);
