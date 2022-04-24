import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import actions from "../../actions";
import BackButton from "../ui/buttons/BackButton";
import InvoiceForm from "../invoices/invoice-form/InvoiceForm";
import classes from "./NewInvoicePage.module.css";

const NewInvoicePage = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const submitHandler = (formData) => {
    dispatch(actions.invoice.addInvoiceAsync(formData));
    history.replace("/invoices");
  };

  return (
    <section className={classes["container"]}>
      <BackButton to="/invoices" label="Go back" />
      <InvoiceForm onSubmit={submitHandler} />
    </section>
  );
};

export default NewInvoicePage;
