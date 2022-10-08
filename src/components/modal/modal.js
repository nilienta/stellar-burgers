import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './modal.module.css';

import { zoomIn } from 'react-animations';
import ModalOverlay from './modalOverlay/modal-overlay';
import ModalHeader from './modal-header/modal-header';

const modalRoot = document.getElementById('modal-root');
const classForModalM = clsx(styles.modal, 'pt-10 pr-10 pb-15 pl-10');
const classForModalL = clsx(styles.modal, 'pt-15 pr-10 pb-30 pl-10');

const ZoomIn = styled.div`
  animation: 1s ${keyframes`${zoomIn}`};
  position: absolute;
  z-index: 1002;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Modal = ({ size, header, onClose, children }) => {
  useEffect(() => {
    document.body.addEventListener(
      'keyup',
      (e) => {
        if (e.key === 'Escape') {
          onClose();
        }
      },
      { once: true }
    );
  }, []);

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClose={onClose} />
      <ZoomIn className={styles.qwe}>
        <div className={size === 'medium' ? classForModalM : classForModalL}>
          <ModalHeader onClose={onClose}>{header}</ModalHeader>
          {children}
        </div>
      </ZoomIn>
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
