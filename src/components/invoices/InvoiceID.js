import React from "react";
import { useSelector } from "react-redux";
import utils from "../../utils/utils";
import classes from "./InvoiceID.module.css";

const InvoiceID = (props) => {
  const { isLightMode } = useSelector((state) => state.ui);
  const allClasses = utils.getClassesFromTheme(isLightMode, classes, "id");
  const cssClasses = `${allClasses["id"]} ${props.className}`;
  return <span className={cssClasses}>{props.id}</span>;
};

export default InvoiceID;
