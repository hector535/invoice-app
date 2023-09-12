import { IInvoice } from "..";
import data from "./invoices.json";

export const invoices = data as IInvoice[];

export const paymentOptions = [
  {
    label: "Net 1 Day",
    value: 1,
  },
  {
    label: "Net 7 Days",
    value: 7,
  },
  {
    label: "Net 14 Days",
    value: 14,
  },
  {
    label: "Net 30 Days",
    value: 30,
  },
];
