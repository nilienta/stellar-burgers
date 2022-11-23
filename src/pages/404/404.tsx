import { FC } from 'react';
import styles from './404.module.css';
import IconBurger from '../../components/burger-constructor/cap-constructor/icon-burger/icon-burger';

const NotFound404: FC = () => {
  return (
    <article className={styles.wrap}>
      <section className={styles.main}>
        <div className={styles.title}>
          <div className={styles.number}>
            <p className="text text_type_digits-large">4</p>
            <IconBurger color="var(--colors-interface-accent)" size={90} />
            <p className="text text_type_digits-large">4</p>
          </div>
          <div className={styles.text}>
            <h1 className="text text_type_main-large pt-3">
              Извините, такой страницы у нас нет.
            </h1>
          </div>
        </div>
        <h2 className="text text_type_main-medium text_color_inactive">
          Но есть много вкусных бургеров. Перейдите в конструктор и соберите
          свой бургер
        </h2>
      </section>
    </article>
  );
};

export default NotFound404;
