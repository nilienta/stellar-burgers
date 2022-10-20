import styles from './burger-ingredients.module.css';

import { useDispatch, useSelector } from 'react-redux';
import {
  SET_VISIBLE_MODAL_INGREDIENT,
  SET_INVISIBLE_MODAL_INGREDIENT,
  SET_VISIBLE_INGREDIENT,
  SET_BUNS,
} from '../../services/actions/app';

import IngredientDetails from './ingredient-details/ingredient-details';
import Modal from '../modal/modal';

import TabWrap from './tab-wrap/tab-wrap';
import IngredientsList from './ingredients-list/ingredients-list';

const BurgerIngredients = () => {
  const dispatch = useDispatch();
  const { isModalIngredientOpen } = useSelector((state) => state.app);

  const handleOpenModal = () => {
    dispatch({
      type: SET_VISIBLE_MODAL_INGREDIENT,
    });
  };

  const handleCloseModal = () => {
    dispatch({
      type: SET_INVISIBLE_MODAL_INGREDIENT,
    });
    dispatch({
      type: SET_VISIBLE_INGREDIENT,
      visibleIngredient: {},
    });
  };

  return (
    <article className={styles['burger-ingredients']}>
      <span className="mb-5">
        <h1 className="text text_type_main-large">Соберите бургер</h1>
      </span>
      <TabWrap />
      <IngredientsList open={handleOpenModal} />
      {isModalIngredientOpen && (
        <Modal
          size="medium"
          header="Детали ингредиента"
          onClose={handleCloseModal}
        >
          <IngredientDetails />
        </Modal>
      )}
    </article>
  );
};

export default BurgerIngredients;
