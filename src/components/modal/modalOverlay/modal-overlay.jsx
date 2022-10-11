import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css';
import clsx from 'clsx';

const classForOverlay = clsx(styles['module-overlay']);

const ModalOverlay = ({ onClose }) => {
  return <div className={classForOverlay} onClick={onClose}></div>;
};

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;
