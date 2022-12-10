import React, { useCallback, FC } from 'react';
import clsx from 'clsx';
import styles from './constructor-ingredients-list.module.css';

import ConstructorElementWrap from '../constructor-element-wrap/constructor-element-wrap';

import {
  useAppSelector,
  useAppDispatch,
  TIngredient,
} from '../../../services/types/types';
import { UPDATE_CONSTRUCTOR_LIST } from '../../../services/actions/app';

const ConstructorIngredientsList: FC = () => {
  const classForList = clsx(styles.list, 'custom-scroll', 'mt-4 mb-4');

  const dispatch = useAppDispatch();
  const { currentMainsAndSauces }: { currentMainsAndSauces: TIngredient[] } =
    useAppSelector((state) => state.app);

  // Коллбэк, в котором ингредиенты меняются местами,
  // если один накладывается на другой
  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      // Получаем перетаскиваемый ингредиент
      const dragCard = currentMainsAndSauces[dragIndex];
      const newCards = [...currentMainsAndSauces];
      // Удаляем перетаскиваемый элемент из массива
      newCards.splice(dragIndex, 1);
      // Вставляем элемент на место того элемента,
      // над которым мы навели мышку с "перетаскиванием"
      // Тут просто создается новый массив, в котором изменен порядок наших элементов
      newCards.splice(hoverIndex, 0, dragCard);
      // В примере react-dnd используется библиотека immutability-helper
      // Которая позволяет описывать такую имутабельную логику более декларативно
      // Но для лучше понимания обновления массива,
      // Советую использовать стандартный splice
      dispatch({
        type: UPDATE_CONSTRUCTOR_LIST,
        currentMainsAndSauces: newCards,
      });
    },
    [currentMainsAndSauces, dispatch]
  );

  return (
    <ul className={classForList}>
      {currentMainsAndSauces.length > 0 &&
        currentMainsAndSauces.map((item, index) => {
          if (item.type !== 'bun') {
            return (
              <ConstructorElementWrap
                key={item.dragId}
                index={index}
                item={item}
                moveCard={moveCard}
              />
            );
          }
        })}
    </ul>
  );
};

export default React.memo(ConstructorIngredientsList);
