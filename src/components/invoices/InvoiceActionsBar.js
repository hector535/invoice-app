import React from "react";
import { useSelector } from "react-redux";
import utils from "../../utils/utils";
import classes from "./InvoiceActionsBar.module.css";

const InvoiceActionsBar = (props) => {
  const { isLightMode } = useSelector((state) => state.ui);
  const allClasses = utils.getClassesFromTheme(
    isLightMode,
    classes,
    "container"
  );
  return (
    <div className={`${allClasses["container"]} ${props.className}`}>
      {props.children}
    </div>
  );
};

export default InvoiceActionsBar;
