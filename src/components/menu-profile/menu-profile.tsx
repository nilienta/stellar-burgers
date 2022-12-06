import React, { useCallback, FC, MouseEventHandler } from 'react';
import { useAppDispatch, useAppSelector } from '../../utils/types';
import styles from './menu-profile.module.css';
import { NavLink } from 'react-router-dom';
import { signOut } from '../../services/actions/login';

const MenuProfile: FC<{ page: 'profile' | 'history' }> = ({ page }) => {
  const dispatch = useAppDispatch();
  const { refreshToken } = useAppSelector((state) => state.auth);

  const logout = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      dispatch(signOut(refreshToken!));
    },
    [refreshToken, dispatch]
  );

  let description = '';
  if (page === 'profile') {
    description = 'В этом разделе вы можете изменить свои персональные данные';
  } else if (page === 'history') {
    description = 'В этом разделе вы можете просмотреть свою историю заказов';
  }
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink
            to="/profile"
            exact={true}
            className={`${styles.link} text text_type_main-medium text_color_inactive`}
            activeClassName={styles['link--active']}
          >
            Профиль
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/profile/orders"
            exact={true}
            className={`${styles.link} text text_type_main-medium text_color_inactive`}
            activeClassName={styles['link--active']}
          >
            История заказов
          </NavLink>
        </li>
        <li>
          <button
            onClick={logout}
            className={`${styles.button} text text_type_main-medium text_color_inactive`}
          >
            Выход
          </button>
        </li>
      </ul>
      <p
        className={`text text_type_main-default text_color_inactive mt-20 ${styles.text}`}
      >
        {description}
      </p>
    </nav>
  );
};

export default React.memo(MenuProfile);
