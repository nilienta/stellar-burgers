import styles from './ingredient.module.css';
import IngredientDetails from '../../components/burger-ingredients/ingredient-details/ingredient-details';
import { useLocation } from 'react-router-dom';

const IngredientPage = () => {
  const location = useLocation();
  const background = location.state && location.state.background;
  if (!background)
    return (
      <article className={styles.wrap}>
        <h1 className={`${styles.title} text text_type_main-large`}>
          Детали ингредиента
        </h1>
        <IngredientDetails />
      </article>
    );
};

export default IngredientPage;
