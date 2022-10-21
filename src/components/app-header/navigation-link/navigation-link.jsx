import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './navigation-link.module.css';

const NavigationLink = ({ text, link, active, last, children }) => {
  const classForLi = clsx(
    styles.item,
    {
      [styles.last]: last === true,
    },
    'ml-5 mr-5'
  );
  const classForText = clsx('text text_type_main-default', {
    text_color_inactive: active === false,
  });

  const classForLink = clsx(styles.link, { classForText });

  return (
    <li className={classForLi}>
      <div>{children}</div>
      <span className={classForText}>
        <a href={link} className={classForLink}>
          {text}
        </a>
      </span>
    </li>
  );
};

NavigationLink.propTypes = {
  text: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  active: PropTypes.bool,
  last: PropTypes.bool,
  children: PropTypes.object,
};

export default NavigationLink;
