import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import utils from "../../../utils/utils";
import { SCREEN_SIZE } from "../../../utils/constants";
import classes from "./InvoiceItem.module.css";

const InvoiceItem = (props) => {
  const { name, quantity, price } = props;
  const viewPortScreenSize = utils.getViewPortScreenSize();
  const { isLightMode } = useSelector((state) => state.ui);
  const allClasses = utils.getClassesFromTheme(
    isLightMode,
    classes,
    "name",
    "qty",
    "price",
    "total",
    "qty-amount"
  );
  let content = null;

  if (
    viewPortScreenSize === SCREEN_SIZE.MEDIUM ||
    viewPortScreenSize === SCREEN_SIZE.LARGE
  ) {
    content = (
      <Fragment>
        <p className={allClasses["name"]}>{name}</p>
        <p className={allClasses["qty"]}>{quantity}</p>
        <p className={allClasses["price"]}>£ {price.toFixed(2)}</p>
        <p className={allClasses["total"]}>£ {(quantity * price).toFixed(2)}</p>
      </Fragment>
    );
  } else {
    content = (
      <Fragment>
        <div className={classes["item"]}>
          <div>
            <p className={allClasses["name"]}>{name}</p>
            <p className={allClasses["qty-amount"]}>
              {quantity} x £ {price.toFixed(2)}
            </p>
          </div>
          <p>£ {(quantity * price).toFixed(2)}</p>
        </div>
      </Fragment>
    );
  }

  return content;
};

export default InvoiceItem;
