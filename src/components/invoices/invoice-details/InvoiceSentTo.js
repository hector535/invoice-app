import React from "react";
import { useSelector } from "react-redux";
import utils from "../../../utils/utils";
import classes from "./InvoiceSentTo.module.css";

const InvoiceSentTo = (props) => {
  const { clientEmail } = props;
  const { isLightMode } = useSelector((state) => state.ui);
  const allClasses = utils.getClassesFromTheme(
    isLightMode,
    classes,
    "sent-to",
    "email"
  );
  return (
    <div className={classes["container"]}>
      <p className={allClasses["sent-to"]}>Sent to</p>
      <p className={allClasses["email"]}>{clientEmail}</p>
    </div>
  );
};

export default InvoiceSentTo;
