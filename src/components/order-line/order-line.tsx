import React, { FC } from 'react';
import styles from './order-line.module.css';
import orderIcon from '../../images/ingredients.png';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../utils/types';
import { useParams } from 'react-router-dom';

const OrderLine: FC<{ needStatus: boolean }> = ({ needStatus }) => {
  //  для дальнейшей работы
  //   const { ingredients } = useAppSelector((state) => state.app);

  //   const { id }: { id: string } = useParams();
  //   const currentItem = ingredients.find((elem) => elem._id == id);
  const orderId = 124;

  return (
    <Link key={orderId} to={`/feed/${orderId}`} className={styles.link}>
      <section className={styles.container}>
        <div className={styles['data-line']}>
          <p className="text text_type_digits-default">#034535</p>
          <p className="text text_type_main-default text_color_inactive">
            Сегодня, 16:20
          </p>
        </div>
        <div className={styles.info}>
          <p className="text text_type_main-medium">
            Death Star Starship Main бургер
          </p>
          {needStatus ? (
            <p className="text text_type_main-default">Создан</p>
          ) : (
            <></>
          )}
        </div>
        <div className={styles['data-line']}>
          <img src={orderIcon} alt="Previous order" />
          <div className={styles.price}>
            <p className="text text_type_digits-default">480</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </section>
    </Link>
  );
};

export default React.memo(OrderLine);
