import { useState } from 'react';
import clsx from 'clsx';

import PropTypes from 'prop-types';
import styles from './tab-wrap.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

const classForTab = clsx(styles['tab-wrap'], 'mt-5 mb-10');

const TabWrap = ({ one, two, three }) => {
  const [current, setCurrent] = useState('one');

  const setTab = (tab) => {
    setCurrent(tab);
    if (tab) {
      const tabObj = eval(tab);
      tabObj.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={classForTab}>
      <Tab value="one" active={current === 'one'} onClick={setTab}>
        Булки
      </Tab>
      <Tab value="two" active={current === 'two'} onClick={setTab}>
        Соусы
      </Tab>
      <Tab value="three" active={current === 'three'} onClick={setTab}>
        Начинки
      </Tab>
    </div>
  );
};

TabWrap.propTypes = {
  one: PropTypes.object,
  two: PropTypes.object,
  three: PropTypes.object,
};

export default TabWrap;
