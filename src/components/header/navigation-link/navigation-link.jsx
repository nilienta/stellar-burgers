import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './navigation-link.module.css';
import { NavLink } from 'react-router-dom';

const NavigationLink = ({ text, link, last, children, exact }) => {
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
};

NavigationLink.propTypes = {
  text: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  last: PropTypes.bool,
  exact: PropTypes.bool,
  children: PropTypes.object,
};

export default NavigationLink;
