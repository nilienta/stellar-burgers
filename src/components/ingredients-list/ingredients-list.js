/* eslint-disable semi */
import PropTypes from "prop-types";
import clsx from "clsx";

import styles from "./ingredients-list.module.css";

import Ingredient from "../ingredient/ingredient.js";

const IngredientsList = (props) => {
  const data = props.data;

  const classForSection = clsx(styles["ingredient-list"], "custom-scroll");
  const classForList = clsx(styles.list, "mt-6 mb-10 pr-1 pl-4");
  const bun = [];
  const main = [];
  const sauce = [];

  const sorting = data.forEach((item) => {
    if (item.type === "bun") {
      bun.push(item);
    } else if (item.type === "main") {
      main.push(item);
    } else {
      sauce.push(item);
    }
  });
  const Ingredients = ({ thread }) => (
    <ul className={classForList}>
      {thread.map((item) => {
        return (
          <Ingredient
            key={item._id}
            count={2}
            image={item.image}
            price={item.price}
            name={item.name}
          />
        );
      })}
    </ul>
  );

  return (
    <section className={classForSection}>
      <span className={styles.title}>
        <h2 className="text text_type_main-medium">Булки</h2>
      </span>
      <Ingredients thread={bun} />
      <span className={styles.title}>
        <h2 className="text text_type_main-medium">Соусы</h2>
      </span>
      <Ingredients thread={sauce} />
      <span className={styles.title}>
        <h2 className="text text_type_main-medium">Начинки</h2>
      </span>
      <Ingredients thread={main} />
    </section>
  );
};

export default IngredientsList;
