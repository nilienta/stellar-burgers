import { useEffect } from 'react';
import ReactDOM from 'react-dom';

import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './modal.module.css';

import ModalOverlay from './modalOverlay/modal-overlay';
import ModalHeader from './modal-header/modal-header';

const Modal = ({ size, header, onClose, children }) => {
  const modalRoot = document.getElementById('modal-root');
  const classForModalM = clsx(styles.modal, 'pt-10 pr-10 pb-15 pl-10');
  const classForModalL = clsx(styles.modal, 'pt-15 pr-10 pb-30 pl-10');

  useEffect(() => {
    const handleESCclose = (e) => {
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
    modalRoot
  );
};

Modal.propTypes = {
  size: PropTypes.string,
  header: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
};

export default Modal;
