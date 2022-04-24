import React from "react";
import { useSelector } from "react-redux";
import InvoiceSentTo from "./InvoiceSentTo";
import utils from "../../../utils/utils";
import classes from "./InvoiceBillTo.module.css";

const InvoiceBillTo = (props) => {
  const {
    clientName,
    clientEmail,
    clientAddress,
    invoiceCreationDate,
    paymentDue,
  } = props;
  const { isLightMode } = useSelector((state) => state.ui);
  const allClasses = utils.getClassesFromTheme(
    isLightMode,
    classes,
    "title",
    "highlight",
    "street",
    "city",
    "post-code",
    "country"
  );
  const { city, country, postCode, street } = clientAddress;
  const createdAt = utils.toDate(invoiceCreationDate);
  const createdAtDay = createdAt.getDate();
  const createdAtMonth = createdAt.toLocaleString("en-us", { month: "short" });
  const createdAtYear = createdAt.getFullYear();

  const paymentDueDate = utils.toDate(paymentDue);
  const paymentDueDay = paymentDueDate.getDate();
  const paymentDueMonth = paymentDueDate.toLocaleString("en-us", {
    month: "short",
  });
  const paymentDueYear = paymentDueDate.getFullYear();

  return (
    <div className={classes["container"]}>
      <div
        className={`${classes["billing-dates-container"]} ${classes["col-1"]}`}
      >
        <p className={allClasses["title"]}>Invoice Date</p>
        <p className={allClasses["highlight"]}>
          {createdAtDay} {createdAtMonth} {createdAtYear}
        </p>
        <p className={`${allClasses["title"]} ${classes["payment-due"]}`}>
          Payment Due
        </p>
        <p className={allClasses["highlight"]}>
          {paymentDueDay} {paymentDueMonth} {paymentDueYear}
        </p>
      </div>
      <div
        className={`${classes["client-info-container"]} ${classes["col-2"]}`}
      >
        <p className={allClasses["title"]}>Bill To</p>
        <p className={allClasses["highlight"]}>{clientName}</p>
        <p className={allClasses["street"]}>{street}</p>
        <p className={allClasses["city"]}>{city}</p>
        <p className={allClasses["post-code"]}>{postCode}</p>
        <p className={allClasses["country"]}>{country}</p>
      </div>

      <InvoiceSentTo clientEmail={clientEmail} />
    </div>
  );
};

export default InvoiceBillTo;
