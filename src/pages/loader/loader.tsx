import { FC } from 'react';
import ReactLoading from 'react-loading';

import { Head } from '../../components/head/head';
import styles from './loader.module.css';

export const Loader: FC = () => {
  return (
    <>
      <Head title="Загрузка..." />
      <section className={styles.main}>
        <ReactLoading
          className="Loader"
          type="spin"
          color="var(    --colors-interface-accent)"
          height="15%"
          width="15%"
        />
      </section>
    </>
  );
};
