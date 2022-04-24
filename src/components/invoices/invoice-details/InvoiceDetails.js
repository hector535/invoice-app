import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import InvoiceHeader from "./InvoiceHeader";
import InvoiceSender from "./InvoiceSender";
import InvoiceBillTo from "./InvoiceBillTo";
import InvoiceItems from "./InvoiceItems";
import InvoiceItemsTotal from "./InvoiceItemsTotal";
import utils from "../../../utils/utils";
import classes from "./InvoiceDetails.module.css";

const InvoiceDetail = (props) => {
  const {
    id,
    clientAddress,
    clientEmail,
    clientName,
    createdAt,
    description,
    items,
    paymentDue,
    senderAddress,
    total,
  } = props.invoice;
  const { isLightMode } = useSelector((state) => state.ui);
  const allClasses = utils.getClassesFromTheme(
    isLightMode,
    classes,
    "container"
  );

  return (
    <Fragment>
      <div className={allClasses["container"]}>
        <div className={classes["header-sender-container"]}>
          <InvoiceHeader id={id} description={description} />
          <InvoiceSender sender={senderAddress} />
        </div>

        <InvoiceBillTo
          clientName={clientName}
          clientAddress={clientAddress}
          invoiceCreationDate={createdAt}
          paymentDue={paymentDue}
          clientEmail={clientEmail}
        />

        <InvoiceItems items={items} />
        <InvoiceItemsTotal total={total} />
      </div>
    </Fragment>
  );
};

export default InvoiceDetail;
