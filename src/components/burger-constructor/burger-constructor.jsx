import { useState, useContext, useMemo, useEffect, useReducer } from 'react';
import clsx from 'clsx';
import styles from './burger-constructor.module.css';

import { TotalPriceContext, DataConstructorContext } from './burger-context';
import { DataContext } from '../App/app-context';

import Modal from '../modal/modal';
import OrderDetails from './order-details/order-details';
import ConstructorElementWrap from './constructor-element-wrap/constructor-element-wrap';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import TotalPrice from './total-price/total-price';

const classForList = clsx(styles.list, 'custom-scroll', 'mt-4 mb-4');
const classForFooter = clsx(styles.footer, 'mt-10 mr-3');

const totalPriceInitialState = { totalPrice: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'set':
      return { totalPrice: action.payload };
    case 'reset':
      return totalPriceInitialState;
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}

const BurgerConstructor = () => {
  const { data } = useContext(DataContext);
  const [state, setState] = useState(false);
  const [totalPrice, totalPriceDispatcher] = useReducer(
    reducer,
    totalPriceInitialState,
    undefined
  );
  const [dataConstructor, setDataConstructor] = useState([]);

  const handleOpenModal = () => {
    setState(true);
  };

  const handleCloseModal = () => {
    setState(false);
  };

  const { bun, mainsAndSauces } = useMemo(
    () => ({
      bun: data.filter((item) => item.type === 'bun').pop(),
      mainsAndSauces: data
        .filter((item) => item.type !== 'bun')
        .slice(0, Math.random() * 13),
    }),
    [data]
  );

  useEffect(() => {
    setDataConstructor(mainsAndSauces.concat(bun));
  }, []);

  useEffect(() => {
    let total = 0;
    if (dataConstructor.length > 0) {
      dataConstructor.map((item) => (total += item.price));
      totalPriceDispatcher({ type: 'set', payload: total });
    } else {
      totalPriceDispatcher({ type: 'reset' });
    }
  }, [dataConstructor]);

  return (
    <article className={styles['burger-constructor']}>
      <DataConstructorContext.Provider
        value={{ dataConstructor, setDataConstructor }}
      >
        <TotalPriceContext.Provider
          value={{ totalPrice, totalPriceDispatcher }}
        >
          <ConstructorElementWrap details={bun} type="top" isLocked={true} />
          <ul className={classForList}>
            {dataConstructor.map((item) => {
              if (item.type !== 'bun') {
                return <ConstructorElementWrap details={item} key={item._id} />;
              }
            })}
          </ul>
          <ConstructorElementWrap details={bun} type="bottom" isLocked={true} />
          <section className={classForFooter}>
            <TotalPrice />
            <Button
              type="primary"
              size="large"
              htmlType="button"
              onClick={handleOpenModal}
            >
              Оформить заказ
            </Button>
          </section>
          {state && (
            <Modal size="large" header="" onClose={handleCloseModal}>
              <OrderDetails />
            </Modal>
          )}
        </TotalPriceContext.Provider>
      </DataConstructorContext.Provider>
    </article>
  );
};

export default BurgerConstructor;
