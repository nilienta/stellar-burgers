import React from 'react';
import { useState } from 'react';
import clsx from 'clsx';

import styles from './tab-wrap.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import { Link } from 'react-scroll';

const TabWrap = () => {
  const classForTab = clsx(styles['tab-wrap'], 'mt-5 mb-10');
  const [current, setCurrent] = useState('one');

  const onSetActive = (tab) => {
    setCurrent(tab);
  };

  return (
    <ul className={classForTab}>
      <Link
        to="buns"
        spy={true}
        smooth={true}
        offset={0}
        duration={300}
        containerId="containerElement"
        onSetActive={() => onSetActive('one')}
      >
        <Tab value="one" active={current === 'one'}>
          Булки
        </Tab>
      </Link>

      <Link
        to="sauces"
        spy={true}
        smooth={true}
        offset={0}
        duration={300}
        containerId="containerElement"
        onSetActive={() => onSetActive('two')}
      >
        <Tab value="two" active={current === 'two'}>
          Соусы
        </Tab>
      </Link>

      <Link
        to="mains"
        spy={true}
        smooth={true}
        offset={0}
        duration={300}
        containerId="containerElement"
        onSetActive={() => onSetActive('three')}
      >
        <Tab value="three" active={current === 'three'}>
          Начинки
        </Tab>
      </Link>
    </ul>
  );
};

export default React.memo(TabWrap);
