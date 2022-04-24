import React from "react";
import { useSelector } from "react-redux";
import utils from "../../../utils/utils";
import classes from "./InvoiceSender.module.css";

const InvoiceSender = (props) => {
  const { city, country, postCode, street } = props.sender;
  const { isLightMode } = useSelector((state) => state.ui);
  const allClasses = utils.getClassesFromTheme(
    isLightMode,
    classes,
    "container"
  );
  return (
    <div className={allClasses["container"]}>
      <p>{street}</p>
      <p>{city}</p>
      <p>{postCode}</p>
      <p>{country}</p>
    </div>
  );
};

export default InvoiceSender;
