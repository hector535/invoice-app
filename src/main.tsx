import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "react-query";
import { Navigate, RouterProvider, createHashRouter } from "react-router-dom";
import { InvoiceLayout } from "@/features/invoices";
import { Invoices } from "@/pages/invoices/invoices";
import { NewInvoice } from "@/pages/new-invoice/new-invoice";
import { EditInvoice } from "@/pages/edit-invoice/edit-invoice";
import { queryClient } from "./lib/react-query";
import "../sass/style.scss";

const router = createHashRouter([
  {
    element: <InvoiceLayout />,
    children: [
      {
        path: "/invoices",
        element: <Invoices />,
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
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
