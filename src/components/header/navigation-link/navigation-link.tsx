import React, { FC } from 'react';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

import styles from './navigation-link.module.css';

type TNavigationLinkProps = {
  text: string;
  link: string;
  last?: boolean;
  exact?: boolean;
  children?: React.ReactNode;
};

export const NavigationLink: FC<TNavigationLinkProps> = React.memo(
  ({ text, link, last, children, exact }) => {
    const classForLi = clsx(
      styles.item,
      {
        [styles.last]: last === true,
      },
      'ml-5 mr-5'
    );
    const classForText = clsx('text text_type_main-default');

    const classForLink = clsx(styles.link, { classForText });

    return (
      <li className={classForLi}>
        <div>{children}</div>
        <span className={classForText}>
          <NavLink
            to={link}
            exact={exact}
            className={classForLink}
            activeClassName={styles['link--active']}
          >
            {text}
          </NavLink>
        </span>
      </li>
    );
  }
);
