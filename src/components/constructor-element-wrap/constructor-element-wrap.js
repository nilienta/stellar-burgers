import clsx from "clsx";

import styles from "./constructor-element-wrap.module.css";

import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";

import icon from "../../images/temp/Vector.svg";

const ConstructorElementWrap = (props) => {
  const classForList = clsx(styles.item, "mr-1 ml-4");
  let iconDrag = null;
  if (props.type !== "top") {
    if (props.type !== "bottom") {
      iconDrag = (
        <div className={styles.icon}>
          <img src={icon} alt="" width="14" height="19" />
        </div>
      );
    }
  }
  return (
    <li className={classForList}>
      {iconDrag}
      <div
        className="ml-8"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "100%",
        }}
      >
        <ConstructorElement
          key={props._id}
          type={props.type}
          isLocked={props.isLocked}
          text={props.text}
          price={props.price}
          thumbnail={props.thumbnail}
        />
      </div>
    </li>
  );
};

export default ConstructorElementWrap;
