import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './menu-profile.module.css';
import { NavLink } from 'react-router-dom';
import { signOut } from '../../services/actions/login';

const MenuProfile = () => {
  const dispatch = useDispatch();
  const { refreshToken } = useSelector((state) => state.auth);

  const logout = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(signOut(refreshToken));
    },
    [refreshToken]
  );

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
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </nav>
  );
};

export default React.memo(MenuProfile);
