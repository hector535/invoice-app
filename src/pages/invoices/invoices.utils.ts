import { FilterOptions, IInvoice } from "@/features/invoices/types";

const stringToBoolean = (str: string) => str === "true";

export const extractQueryStringValues = (url: URLSearchParams) => {
  const draft = stringToBoolean(url.get("draft") || "false");
  const pending = stringToBoolean(url.get("pending") || "false");
  const paid = stringToBoolean(url.get("paid") || "false");

  return { draft, pending, paid };
};

export const getViewportSize = () => {
  const vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );
  const vh = Math.max(
    document.documentElement.clientHeight || 0,
    window.innerHeight || 0
  );

  return {
    vw,
    vh,
  };
};

export const filterInvoices = (
  invoices: IInvoice[],
  options: FilterOptions
) => {
  const { draft, paid, pending } = options;

  //return the entire array when the user doesn't select a filter option
  if (!draft && !paid && !pending) return invoices;

  return invoices.filter((invoice) => options[invoice.status]);
};
