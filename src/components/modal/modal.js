import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './modal.module.css';

import ModalOverlay from './modalOverlay/modal-overlay';
import ModalHeader from './modal-header/modal-header';

const modalRoot = document.getElementById('modal-root');
const classForModalM = clsx(styles.modal, 'pt-10 pr-10 pb-15 pl-10');
const classForModalL = clsx(styles.modal, 'pt-15 pr-10 pb-30 pl-10');

const Modal = ({ size, header, onClose, children }) => {
  document.body.addEventListener(
    'keyup',
    (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    { once: true }
  );
  return ReactDOM.createPortal(
    <ModalOverlay onClose={onClose}>
      <div className={size === 'medium' ? classForModalM : classForModalL}>
        <ModalHeader onClose={onClose}>{header}</ModalHeader>
        {children}
      </div>
    </ModalOverlay>,
    modalRoot
  );
};

Modal.propTypes = {
  size: PropTypes.string,
  header: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
