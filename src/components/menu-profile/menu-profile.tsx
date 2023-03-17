import React, { useCallback, FC } from 'react';
import { NavLink } from 'react-router-dom';

import { signOut } from '../../services/actions/logout';
import { useAppDispatch, useAppSelector } from '../../services/types/types';
import styles from './menu-profile.module.css';

export const MenuProfile: FC<{ page: 'profile' | 'history' }> = React.memo(
  ({ page }) => {
    const dispatch = useAppDispatch();
    const { refreshToken } = useAppSelector((state) => state.auth);

    const logout = useCallback(
      (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        dispatch(signOut(refreshToken!));
      },
      [refreshToken, dispatch]
    );

    const descriptionProfile =
      'В этом разделе вы можете изменить свои персональные данные';
    const descriptionHistory =
      'В этом разделе вы можете просмотреть свою историю заказов';
    const description =
      page === 'profile'
        ? descriptionProfile
        : page === 'history'
        ? descriptionHistory
        : '';

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
  }
);
