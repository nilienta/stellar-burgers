import React, { FC, useState } from 'react';
import styles from './tab-wrap.module.css';
import clsx from 'clsx';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-scroll';

type TTab = 'one' | 'two' | 'three';

const TabWrap: FC = () => {
  const classForTab = clsx(styles['tab-wrap'], 'mt-5 mb-10');
  const [current, setCurrent] = useState('one');

  const onSetActive = (tab: TTab) => {
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
        <Tab value="one" active={current === 'one'} onClick={setCurrent}>
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
        <Tab value="two" active={current === 'two'} onClick={setCurrent}>
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
        <Tab value="three" active={current === 'three'} onClick={setCurrent}>
          Начинки
        </Tab>
      </Link>
    </ul>
  );
};

export default React.memo(TabWrap);
