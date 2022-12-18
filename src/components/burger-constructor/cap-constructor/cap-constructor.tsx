import React, { FC } from 'react';
import styles from './cap-constructor.module.css';
import clsx from 'clsx';

import IconBurger from './icon-burger/icon-burger';

const CapConstructor: FC = () => {
  const classForWrapper = clsx(styles.wrapper, 'pt-10 pr-10 pb-10 pl-10');
  const classForTitle = clsx(styles.title, 'text text_type_main-large');

  return (
    <section className={classForWrapper}>
      <div className={styles['burger-row']} data-test-id="test-constructor">
        <IconBurger color="white" size={80} />
        <IconBurger color="var(--colors-interface-success)" size={80} />
        <IconBurger color="var(--colors-interface-accent)" size={80} />
      </div>
      <h1 className={classForTitle}>
        Перенесите сюда ингредиенты для вашего бургера
      </h1>
    </section>
  );
};

export default React.memo(CapConstructor);
