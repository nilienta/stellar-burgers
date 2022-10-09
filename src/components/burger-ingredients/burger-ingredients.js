import React from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';

import { PropTypesForDataList } from '../../prop-types.js';

import IngredientDetails from '../burger-ingredients/ingredient-details/ingredient-details';
import Modal from '../../components/modal/modal';

import TabWrap from './tab-wrap/tab-wrap.js';
import IngredientsList from './ingredients-list/ingredients-list.js';

const BurgerIngredients = ({ data }) => {
  const tabBun = React.createRef();
  const tabSauce = React.createRef();
  const tabMain = React.createRef();

  const [state, setState] = React.useState(false);
  const [item, setItem] = React.useState(() => {});

  const handleOpenModal = () => {
    setState(true);
  };

  const handleCloseModal = () => {
    setState(false);
  };

  return (
    <article className={styles['burger-ingredients']}>
      <span className="mb-5">
        <h1 className="text text_type_main-large">Соберите бургер</h1>
      </span>
      <TabWrap one={tabBun} two={tabSauce} three={tabMain} />
      <IngredientsList
        data={data}
        open={handleOpenModal}
        srcClick={setItem}
        one={tabBun}
        two={tabSauce}
        three={tabMain}
      />
      {state && (
        <Modal
          size="medium"
          header="Детали ингредиента"
          onClose={handleCloseModal}
        >
          <IngredientDetails details={item} />
        </Modal>
      )}
    </article>
  );
};

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(PropTypesForDataList).isRequired,
};

export default BurgerIngredients;
