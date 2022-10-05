import styles from './modal-overlay.module.css';
import clsx from 'clsx';

const classForOverlay = clsx(styles['module-overlay']);

const ModalOverlay = ({ onClose, children }) => {
  const checkElement = (e) => {
    if (e.target.className === classForOverlay) {
      onClose();
    }
  };
  return (
    <div className={classForOverlay} onClick={checkElement}>
      {children}
    </div>
  );
};

export default ModalOverlay;
