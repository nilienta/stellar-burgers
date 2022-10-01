import clsx from 'clsx';

import styles from './navigation-link.module.css';

const NavigationLink = (props) => {
  const classForLi = clsx(
    styles.item,
    {
      [styles.last]: props.last === 'true',
    },
    'ml-5 mr-5'
  );
  const classForText = clsx('text text_type_main-default', {
    text_color_inactive: props.active === 'false',
  });

  const classForLink = clsx(styles.link, { classForText });

  return (
    <li className={classForLi}>
      <div>{props.children}</div>
      <span className={classForText}>
        <a href={props.link} className={classForLink}>
          {props.text}
        </a>
      </span>
    </li>
  );
};

export default NavigationLink;
