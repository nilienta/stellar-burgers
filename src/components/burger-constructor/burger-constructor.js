import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './burger-constructor.module.css';

import ConstructorElementWrap from '../constructor-element-wrap/constructor-element-wrap.js';
import img from '../../images/temp/sauce-03.png';

import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import TotalPrice from '../total-price/total-price';

const BurgerConstructor = (props) => {
  const data = props.data;
  const classForList = clsx(styles.list, 'custom-scroll', 'mt-4 mb-4');
  const classForFooter = clsx(styles.footer, 'mt-10 mr-3');
  return (
    <article className={styles['burger-constructor']}>
      <ConstructorElementWrap
        key="1212f3f412f3f23g3"
        type="top"
        isLocked={true}
        text={data[0].name}
        price={data[0].price}
        thumbnail={data[0].image}
      />
      <ul className={classForList}>
        {data.map((item) => {
          return (
            <ConstructorElementWrap
              key={item._id}
              text={item.name}
              price={item.price}
              thumbnail={item.image}
            />
          );
        })}
      </ul>
      <ConstructorElementWrap
        key="1212412ddef3f23g3"
        type="bottom"
        isLocked={true}
        text={data[data.length - 1].name}
        price={data[data.length - 1].price}
        thumbnail={data[data.length - 1].image}
      />
      <section className={classForFooter}>
        <TotalPrice totalPrice="610" />
        <Button type="primary" size="large" htmlType="button">
          Оформить заказ
        </Button>
      </section>
    </article>
  );
};
const BurgerConstructorPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  count: PropTypes.number,
});
BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(BurgerConstructorPropTypes).isRequired,
};

export default BurgerConstructor;
