import { createSlice } from "@reduxjs/toolkit";
import data from "../data.json";

const invoicesJson = localStorage.getItem("invoices");

if (!invoicesJson) {
  localStorage.setItem("invoices", JSON.stringify(data));
}

let lsInvoices = JSON.parse(localStorage.getItem("invoices"));

const initialState = {
  invoices: lsInvoices,
};

const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    setInvoices: (state, action) => {
      state.invoices = action.payload;
    },
    addInvoice: (state, action) => {
      const invoice = { ...action.payload };
      state.invoices.push(invoice);
    },
    editInvoice: (state, action) => {
      const invoice = { ...action.payload };
      const invoiceIndex = state.invoices.findIndex(
        (inv) => inv.id === invoice.id
      );

      state.invoices[invoiceIndex] = invoice;
    },
    removeInvoice: (state, action) => {
      const id = action.payload;
      state.invoices = state.invoices.filter((invoice) => invoice.id !== id);
    },
    setInvoiceStatus: (state, action) => {
      const { id, status } = action.payload;
      const invoiceIndex = state.invoices.findIndex(
        (invoice) => invoice.id === id
      );
      const updatedInvoice = state.invoices[invoiceIndex];

      updatedInvoice.status = status;
      state.invoices[invoiceIndex] = updatedInvoice;
    },
  },
});

export default invoiceSlice;
