import React from "react";
import classes from "./Button.module.css";

const Button = (props) => {
  const btnClasses = `${classes["btn"]} ${classes["btn--" + props.color]} ${
    props.className
  }`;
  return (
    <button type="button" className={btnClasses} onClick={props.onClick}>
      {props.label}
    </button>
  );
};

export default Button;
