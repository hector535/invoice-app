import actions from ".";

export const addInvoiceAsync = (invoice) => {
  return (dispatch) => {
    const invoices = JSON.parse(localStorage.getItem("invoices"));
    invoices.push({ ...invoice });
    localStorage.setItem("invoices", JSON.stringify(invoices));
    dispatch(actions.invoice.addInvoice(invoice));
  };
};

export const removeInvoiceAsync = (id) => {
  return (dispatch) => {
    let invoices = JSON.parse(localStorage.getItem("invoices"));
    invoices = invoices.filter((invoice) => invoice.id !== id);
    localStorage.setItem("invoices", JSON.stringify(invoices));

    dispatch(actions.invoice.removeInvoice(id));
  };
};

export const editInvoiceAsync = (invoice) => {
  return (dispatch) => {
    const invoices = JSON.parse(localStorage.getItem("invoices"));
    const invoiceIndex = invoices.findIndex((inv) => inv.id === invoice.id);
    invoices[invoiceIndex] = invoice;

    localStorage.setItem("invoices", JSON.stringify(invoices));
    dispatch(actions.invoice.editInvoice(invoice));
  };
};

export const setInvoiceStatusAsync = (invoice) => {
  return (dispatch) => {
    const invoices = JSON.parse(localStorage.getItem("invoices"));
    const invoiceIndex = invoices.findIndex((inv) => inv.id === invoice.id);
    const invoiceUpdated = { ...invoices[invoiceIndex] };

    invoiceUpdated.status = invoice.status;

    invoices[invoiceIndex] = invoiceUpdated;

    localStorage.setItem("invoices", JSON.stringify(invoices));

    dispatch(
      actions.invoice.setInvoiceStatus({
        id: invoice.id,
        status: invoice.status,
      })
    );
  };
};
