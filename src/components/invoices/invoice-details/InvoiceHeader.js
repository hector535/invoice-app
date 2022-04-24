import React from "react";
import { useSelector } from "react-redux";
import InvoiceID from "../InvoiceID";
import utils from "../../../utils/utils";
import classes from "./InvoiceHeader.module.css";

const InvoiceHeader = (props) => {
  const { id, description } = props;
  const { isLightMode } = useSelector((state) => state.ui);
  const allClasses = utils.getClassesFromTheme(
    isLightMode,
    classes,
    "description"
  );
  return (
    <div className={classes["id-description-container"]}>
      <InvoiceID id={id} className={classes["id"]} />
      <p className={allClasses["description"]}>{description}</p>
    </div>
  );
};

export default InvoiceHeader;
