import React from "react";
import { ReactComponent as EmptyImg } from "../../assets/illustration-empty.svg";
import classes from "./EmptyInvoices.module.css";

const EmptyInvoices = () => {
  return (
    <div className={classes["container"]}>
      <EmptyImg viewBox="0 0 242 200" className={classes["img"]} />
      <h1>There is nothing here</h1>
      <p>Create an invoice by clicking the</p>
      <p>
        <strong>New</strong> button and get started
      </p>
    </div>
  );
};

export default EmptyInvoices;
