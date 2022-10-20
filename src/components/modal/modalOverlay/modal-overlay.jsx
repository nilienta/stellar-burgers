import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css';
import clsx from 'clsx';

const ModalOverlay = ({ onClose }) => {
  const classForOverlay = clsx(styles['module-overlay']);

  return <div className={classForOverlay} onClick={onClose}></div>;
};

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;
