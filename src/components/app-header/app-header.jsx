import styles from './app-header.module.css';

import { Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';


import NavigationLink from './navigation-link/navigation-link';

const AppHeader = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.inner}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <ul className={styles.menu}>
          <NavigationLink text="Конструктор" link="" active={true} last={false}>
            <BurgerIcon />
          </NavigationLink>
          <NavigationLink
            text="Лента заказов"
            link=""
            active={false}
            last={false}
          >
            <ListIcon />
          </NavigationLink>
          <NavigationLink
            text="Личный кабинет"
            link=""
            active={false}
            last={true}
          >
            <ProfileIcon />
          </NavigationLink>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
