import clsx from 'clsx';
import styles from './order-details.module.css';

import modalDone from '../../../images/modal-done.png';

const classForOrder = clsx(styles['order-details'], 'mt-9');
const classForNumber = clsx(
  styles['order-number'],
  'text text_type_digits-large',
  'mb-8'
);

const OrderDetails = () => {
  return (
    <section className={classForOrder}>
      <h1 className={classForNumber}>036584</h1>
      <h2 className="text text_type_main-medium">идентификатор заказа</h2>
      <img
        className="mt-15 mb-15"
        src={modalDone}
        alt="Order accepted"
        width="122px"
        height="122px"
      />
      <p className="text text_type_main-default mb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </section>
  );
};

export default OrderDetails;
