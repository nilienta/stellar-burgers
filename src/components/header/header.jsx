import styles from './header.module.css';

import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import NavigationLink from './navigation-link/navigation-link';

const Header = () => {
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
            <BurgerIcon />
          </NavigationLink>
          <NavigationLink
            text="Лента заказов"
            link="/changeLink"
            exact={false}
            last={false}
          >
            <ListIcon />
          </NavigationLink>
          <NavigationLink
            text="Личный кабинет"
            link="/profile"
            exact={false}
            last={true}
          >
            <ProfileIcon />
          </NavigationLink>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
