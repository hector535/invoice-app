import React from "react";
import InvoiceItem from "./InvoiceItem";
import classes from "./InvoiceList.module.css";

const InvoiceList = (props) => {
  const { invoices } = props;
  const invoicesMapped = invoices.map((invoice) => (
    <InvoiceItem
      key={invoice.id}
      id={invoice.id}
      client={invoice.clientName}
      due={invoice.paymentDue}
      total={invoice.total}
      status={invoice.status}
      onItemClick={props.onItemClick}
    />
  ));
  return <ul className={classes["invoices"]}>{invoicesMapped}</ul>;
};

export default InvoiceList;
