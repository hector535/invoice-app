import React from "react";
import { useSelector } from "react-redux";
import utils from "../../utils/utils";
import classes from "./InvoiceStatusListItem.module.css";

const InvoiceStatusListItem = (props) => {
  const { index, label, value } = props;
  const { isLightMode } = useSelector((state) => state.ui);
  const allClasses = utils.getClassesFromTheme(
    isLightMode,
    classes,
    "item",
    "checkbox"
  );

  return (
    <li className={allClasses["item"]}>
      <label className={classes["container"]}>
        <input
          type="checkbox"
          value={value}
          onChange={props.onItemChange.bind(this, index)}
        />
        {label}
        <span className={allClasses["checkbox"]}></span>
      </label>
    </li>
  );
};

export default InvoiceStatusListItem;
