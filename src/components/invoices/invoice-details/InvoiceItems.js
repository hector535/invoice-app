import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import utils from "../../../utils/utils";
import { SCREEN_SIZE } from "../../../utils/constants";
import InvoiceItem from "./InvoiceItem";
import classes from "./InvoiceItems.module.css";

const InvoiceItems = (props) => {
  const { items } = props;
  const { isLightMode } = useSelector((state) => state.ui);
  const viewPortScreenSize = utils.getViewPortScreenSize();
  const allClasses = utils.getClassesFromTheme(
    isLightMode,
    classes,
    "container",
    "name",
    "qty",
    "price",
    "total"
  );

  let headers = null;
  let content = <p className={classes["no-items"]}>No items added</p>;

  if (
    viewPortScreenSize === SCREEN_SIZE.MEDIUM ||
    viewPortScreenSize === SCREEN_SIZE.LARGE
  ) {
    headers = (
      <Fragment>
        <p className={allClasses["name"]}>Item Name</p>
        <p className={allClasses["qty"]}>QTY.</p>
        <p className={allClasses["price"]}>Price</p>
        <p className={allClasses["total"]}>Total</p>
      </Fragment>
    );
  }

  if (items.length > 0) {
    content = items.map((item) => (
      <InvoiceItem
        key={item.name}
        name={item.name}
        quantity={item.quantity}
        price={item.price}
      />
    ));
  }
  return (
    <div className={allClasses["container"]}>
      {headers}
      {content}
    </div>
  );
};

export default InvoiceItems;
