import { useMutation, useQuery, useQueryClient } from "react-query";
import { FilterOptions, IInvoice } from "../../types";
import { addInvoice, getInvoiceById, getInvoices } from "./invoices";

export const useGetInvoices = (filters: FilterOptions) => {
  const { data, ...rest } = useQuery(["invoices", filters], () =>
    getInvoices(filters)
  );

  return {
    invoices: data ?? [],
    ...rest,
  };
};

export const useGetInvoiceById = (id: string) => {
  const { data, ...rest } = useQuery(
    ["invoices", id],
    () => getInvoiceById(id),
    {
      suspense: true,
    }
  );

  return {
    invoice: data ?? ({} as IInvoice),
    ...rest,
  };
};

export const useSaveInvoice = () => {
  const queryClient = useQueryClient();

  return useMutation(addInvoice, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("invoices");
    },
  });
};
