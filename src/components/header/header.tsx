import React, { FC } from 'react';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

import { NavigationLink } from './navigation-link/navigation-link';
import styles from './header.module.css';

export const Header: FC = React.memo(() => {
  return (
    <header className={styles.header}>
      <nav className={styles.inner}>
        <div className={styles.logo}>
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <ul className={styles.menu}>
          <NavigationLink text="Конструктор" link="/" exact={true} last={false}>
            <BurgerIcon type="primary" />
          </NavigationLink>
          <NavigationLink
            text="Лента заказов"
            link="/feed"
            exact={false}
            last={false}
          >
            <ListIcon type="primary" />
          </NavigationLink>
          <NavigationLink
            text="Личный кабинет"
            link="/profile"
            exact={false}
            last={true}
          >
            <ProfileIcon type="primary" />
          </NavigationLink>
        </ul>
      </nav>
    </header>
  );
});
