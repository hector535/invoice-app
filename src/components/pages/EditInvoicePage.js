import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import actions from "../../actions";
import BackButton from "../ui/buttons/BackButton";
import InvoiceForm from "../invoices/invoice-form/InvoiceForm";
import classes from "./EditInvoicePage.module.css";

const EditInvoicePage = () => {
  const history = useHistory();
  const { id } = useParams();
  const { invoices } = useSelector((state) => state.invoice);
  const dispatch = useDispatch();
  const invoiceToEdit = invoices.find((invoice) => invoice.id === id);
  let contentPage = <p>INVOICE NOT FOUND</p>;

  const submitHandler = (formData) => {
    dispatch(actions.invoice.editInvoiceAsync(formData));
    history.replace("/invoices");
  };

  if (invoiceToEdit) {
    contentPage = (
      <InvoiceForm invoice={invoiceToEdit} onSubmit={submitHandler} isEditing />
    );
  }

  return (
    <section className={classes["container"]}>
      <BackButton to={`/invoices/${id}`} label="Go back" />
      {contentPage}
    </section>
  );
};

export default EditInvoicePage;
