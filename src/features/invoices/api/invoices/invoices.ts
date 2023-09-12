import {
  filterInvoices,
  generateID,
  getInvoicesFromStorage,
  updateInvoicesInStorage,
} from "./invoices.utils";
import { FilterOptions, IInvoice } from "../../types";

const delay = 600;

export const getInvoices = async (filters: FilterOptions) => {
  await new Promise((resolve) => setTimeout(resolve, delay));

  const invoices = getInvoicesFromStorage();

  return filterInvoices(invoices, filters);
};

export const getInvoiceById = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, delay));

  const invoices = getInvoicesFromStorage();

  return invoices.find((inv) => inv.id === id);
};

export const addInvoice = async (invoice: Omit<IInvoice, "id">) => {
  await new Promise((resolve) => setTimeout(resolve, delay));

  const invoices = getInvoicesFromStorage();
  const invoiceWithId = {
    ...invoice,
    id: generateID(),
  };

  updateInvoicesInStorage([...invoices, invoiceWithId]);

  return invoiceWithId;
};

export const updateInvoice = () => {};

export const deleteInvoiceById = () => {};
