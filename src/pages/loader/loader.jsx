import styles from './loader.module.css';
import ReactLoading from 'react-loading';

const Loader = () => {
  return (
    <section className={styles.main}>
      <ReactLoading
        className={'Loader'}
        type={'spin'}
        color="var(    --colors-interface-accent)"
        height={'15%'}
        width={'15%'}
      />
    </section>
  );
};

export default Loader;
