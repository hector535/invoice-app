import React from "react";
import { useSelector } from "react-redux";
import utils from "../../../utils/utils";
import classes from "./InvoiceItemsTotal.module.css";

const InvoiceItemsTotal = (props) => {
  const { total } = props;
  const { isLightMode } = useSelector((state) => state.ui);
  const allClasses = utils.getClassesFromTheme(
    isLightMode,
    classes,
    "container"
  );
  return (
    <div className={allClasses["container"]}>
      <p>Amount Due</p>
      <p className={classes["total"]}>£ {total.toFixed(2)}</p>
    </div>
  );
};

export default InvoiceItemsTotal;
