import React from "react";
import { useSelector } from "react-redux";
import utils from "../../../utils/utils";
import classes from "./Input.module.css";

const Input = (props) => {
  const { label, input, error, className } = props;
  const { isLightMode } = useSelector((state) => state.ui);
  const allClasses = utils.getClassesFromTheme(
    isLightMode,
    classes,
    "label",
    "input"
  );

  let divClasses = `${classes["container"]} ${className}`;
  let hasError = null;
  let message = null;

  if (error) {
    hasError = error.hasError;
    message = error.message;
  }

  let updatedInput = { ...input };
  let inputClass = `${allClasses["input"]} ${updatedInput.className}`;
  updatedInput.className = "";

  return (
    <div className={divClasses}>
      <label htmlFor={input.id} className={allClasses["label"]}>
        {label}
      </label>
      <input {...updatedInput} className={inputClass} />
      {hasError && <p className={classes["error"]}>{message}</p>}
    </div>
  );
};

export default Input;
