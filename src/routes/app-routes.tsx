import { Navigate } from "react-router-dom";
import { InvoiceLayout } from "@/features/invoices";
import { Invoices, InvoiceDetails, NewInvoice, EditInvoice } from "@/pages";

export const appRoutes = [
  {
    element: <InvoiceLayout />,
    children: [
      {
        path: "/invoices",
        element: <Invoices />,
      },
      {
        path: "/invoices/:invoiceId",
        element: <InvoiceDetails />,
      },
      {
        path: "/invoices/new",
        element: <NewInvoice />,
      },
      {
        path: "/invoices/:invoiceId/edit",
        element: <EditInvoice />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/invoices" />,
  },
];
