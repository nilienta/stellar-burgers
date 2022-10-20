import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { PropTypesForIngredient } from '../../../prop-types';
import clsx from 'clsx';

import styles from './constructor-element-wrap.module.css';

import { DELETE_INGREDIENTS } from '../../../services/actions/app';
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd/dist/hooks';

import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

const ConstructorElementWrap = React.memo(
  ({ index, item, type, isLocked, moveCard }) => {
    const classForList = clsx(styles.item, 'mr-1 ml-4 pl-8');
    const dispatch = useDispatch();

    const onDelete = () => {
      dispatch({
        type: DELETE_INGREDIENTS,
        id: item._id,
        item: item,
        dragId: item.dragId,
      });
    };

    const ref = useRef(null);

    const [{ handlerId }, drop] = useDrop({
      accept: 'component',
      collect(monitor) {
        return {
          handlerId: monitor.getHandlerId(),
        };
      },
      // Вызывается, когда перетаскиваемый элемент оказывается над ингредиентом,
      // индекс которого у нас задан в пропсах props.index
      hover(item, monitor) {
        if (!ref.current) {
          return;
        }
        // Переопределяем индексы ингредиентов для удобства
        const dragIndex = item.index;
        const hoverIndex = index;
        // Ничего не делаем, если ингредиент находится над собой
        if (dragIndex === hoverIndex) {
          return;
        }
        // Определяем границы карточки ингредиента
        const hoverBoundingRect = ref.current?.getBoundingClientRect();
        // Определяем середину карточки по оси Y нашего ингредиента
        // В момент пересечения этой границы, перетаскиваемым ингредиентом
        // Мы будем менять их местами
        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        // Получаем текущую позицию курсора,
        // относительно текущего контейнера
        const clientOffset = monitor.getClientOffset();
        // Вычисляем координаты курсора и координаты середины карточки
        // на которую мы навели наш перетаскиваемый ингредиент
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;
        // Условие для перетаскивании элементов сверху вниз
        // Если перетаскиваемый ингредиент пересекает середину
        // текущего ингредиента, то мы идем дальше и выполняем moveCard
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }
        // Условие для перетаскивании элементов снизу вверх
        // Происходит тоже самое что и выше, только в обратном порядке
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }
        // Выполняем наш коллбэк с перемещением карточек внутри массива
        moveCard(dragIndex, hoverIndex);
        // Это сделано для внутренней оптимизации библиотеки
        // для поиска и замены элементом
        item.index = hoverIndex;
      },
    });

    // Задаем функционал перетаскивания для элементов внутри списка
    // ингредиентов заказа
    const [{ isDragging }, drag] = useDrag({
      type: 'component',
      item: () => ({ id: item._id, index }),
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });
    const opacity = isDragging ? 0 : 1;

    // Тут мы говорим что наш элемент и перетаскиваемый и бросаемый :)
    if (item.type !== 'bun') drag(drop(ref));
    // Прерываем базовую функция для onDrop
    // потому что браузер по умолчанию не сбрасывает наш элемент в контейнер
    const preventDefault = (e) => e.preventDefault();

    return (
      <li
        className={classForList}
        ref={ref}
        style={{ opacity }}
        onDrop={preventDefault}
        data-handler-id={handlerId}
      >
        {type !== 'top' && type !== 'bottom' && (
          <div className={styles.icon}>
            <DragIcon type="primary" />
          </div>
        )}
        <ConstructorElement
          id={item._id}
          type={type}
          isLocked={isLocked}
          handleClose={() => {
            onDelete(item.dragId);
          }}
          text={item.name}
          price={item.price}
          thumbnail={item.image}
        />
      </li>
    );
  }
);

ConstructorElementWrap.propTypes = {
  index: PropTypes.number,
  item: PropTypes.shape(PropTypesForIngredient).isRequired,
  type: PropTypes.string,
  isLocked: PropTypes.bool,
  moveCard: PropTypes.func,
};

export default ConstructorElementWrap;
