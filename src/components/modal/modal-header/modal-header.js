import styles from './modal-header.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const ModalHeader = ({ onClose, children }) => {
  return (
    <div className={styles.header}>
      <span>
        <h1 className="text text_type_main-large">{children}</h1>
      </span>
      <div className={styles.cross} onClick={onClose}>
        <CloseIcon type="primary" />
      </div>
    </div>
  );
};

export default ModalHeader;
