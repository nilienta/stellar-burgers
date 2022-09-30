import styles from "./total-price.module.css";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const TotalPrice = (props) => {
  return (
    <div className={styles.price}>
      <span className="text text_type_digits-medium">{props.totalPrice}</span>
      <CurrencyIcon type="primary" />
    </div>
  );
};

export default TotalPrice;
