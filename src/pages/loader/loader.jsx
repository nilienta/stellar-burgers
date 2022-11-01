import IconBurger from '../../components/burger-constructor/cap-constructor/icon-burger/icon-burger';
import styles from './loader.module.css';

const Loader = () => {
  return (
    <div className={styles.wrap}>
      <section className={styles.main}>
        <IconBurger size={200} color="var(--colors-interface-success)" />
      </section>
    </div>
  );
};

export default Loader;
