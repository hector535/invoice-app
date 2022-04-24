import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import actions from "../../actions";
import { useHistory } from "react-router-dom";
import InvoiceList from "../invoices/InvoiceList";
import InvoicesActionsBar from "../invoices/InvoicesActionsBar";
import EmptyInvoices from "../invoices/EmptyInvoices";
import utils from "../../utils/utils";
import { SCREEN_SIZE } from "../../utils/constants";
import SideDrawerOverlay from "../ui/side-drawer/SideDrawer";
import InvoiceForm from "../invoices/invoice-form/InvoiceForm";
import classes from "./AllInvoicesPage.module.css";

const AllInvoicesPage = () => {
  const invoiceState = useSelector((state) => state.invoice);
  const { isLightMode } = useSelector((state) => state.ui);
  const allClasses = utils.getClassesFromTheme(
    isLightMode,
    classes,
    "title",
    "sub-title"
  );
  const dispatch = useDispatch();
  const { invoices } = invoiceState;
  const [filteredInvoices, setFilteredInvoices] = useState(invoices);
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setFilteredInvoices(invoices);
  }, [invoices, setFilteredInvoices]);

  const invoiceClickHandler = (id) => {
    history.push("/invoices/" + id);
  };

  const newInvoiceHandler = () => {
    const viewPortScreenSize = utils.getViewPortScreenSize();
    if (
      viewPortScreenSize === SCREEN_SIZE.MEDIUM ||
      viewPortScreenSize === SCREEN_SIZE.LARGE
    ) {
      setShowModal(true);
    } else {
      history.push("/invoices/new");
    }
  };

  const closeModalHandler = () => {
    setShowModal(false);
  };

  const filterChangeHandler = useCallback(
    (filter) => {
      const allValuesAreFalse = !filter.some((status) => status.value === true);
      const allValuesAreTrue = !filter.some((status) => status.value === false);
      let filteredInvoices = [];

      if (allValuesAreFalse || allValuesAreTrue) {
        setFilteredInvoices([...invoices]);
        return;
      }

      for (let i = 0; i < filter.length; i++) {
        if (filter[i].value) {
          const filteredArr = invoices.filter(
            (invoice) => invoice.status === filter[i].name
          );
          filteredInvoices = [...filteredInvoices, ...filteredArr];
        }
      }
      setFilteredInvoices(filteredInvoices);
    },
    [invoices]
  );

  const submitHandler = (formData) => {
    setShowModal(false);
    dispatch(actions.invoice.addInvoiceAsync(formData));
  };

  return (
    <section>
      <div className={classes["title-actions-container"]}>
        <div className={classes["page-info"]}>
          <h1 className={allClasses["title"]}>Invoices</h1>
          <p className={allClasses["sub-title"]}>
            {filteredInvoices.length === 0
              ? "No invoices"
              : `${filteredInvoices.length} invoices`}
          </p>
        </div>
        <InvoicesActionsBar
          onFilterChange={filterChangeHandler}
          onNewInvoice={newInvoiceHandler}
        />
      </div>
      {filteredInvoices.length !== 0 && (
        <InvoiceList
          invoices={filteredInvoices}
          onItemClick={invoiceClickHandler}
        />
      )}
      {filteredInvoices.length === 0 && <EmptyInvoices />}

      {showModal && (
        <SideDrawerOverlay onBackDropClick={closeModalHandler}>
          <InvoiceForm onSubmit={submitHandler} />
        </SideDrawerOverlay>
      )}
    </section>
  );
};

export default AllInvoicesPage;
