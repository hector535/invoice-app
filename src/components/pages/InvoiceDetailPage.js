import React, { useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import actions from "../../actions";
import InvoiceID from "../invoices/InvoiceID";
import BackButton from "../ui/buttons/BackButton";
import InvoiceDetail from "../invoices/invoice-details/InvoiceDetails";
import InvoiceActionsBar from "../invoices/InvoiceActionsBar";
import Modal from "../ui/modal/Modal";
import Button from "../ui/buttons/Button";
import Badge from "../ui/Badge";
import utils from "../../utils/utils";
import { INVOICE_STATUS, SCREEN_SIZE } from "../../utils/constants";
import SideDrawer from "../ui/side-drawer/SideDrawer";
import InvoiceForm from "../invoices/invoice-form/InvoiceForm";
import classes from "./InvoiceDetailPage.module.css";

const InvoiceDetailPage = () => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showSideDrawer, setShowSideDrawer] = useState(false);
  const invoiceState = useSelector((state) => state.invoice);
  const { isLightMode } = useSelector((state) => state.ui);
  const allClasses = utils.getClassesFromTheme(
    isLightMode,
    classes,
    "status-badge-actions-container",
    "modal-title",
    "modal-message"
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const invoice = invoiceState.invoices.find((invoice) => invoice.id === id);
  const badgeColor = utils.getBadgeColor(invoice.status);
  const viewPortScreenSize = utils.getViewPortScreenSize();

  const showDeleteConfirmationHandler = (flag) => {
    setShowDeleteConfirmation(flag);
  };

  const deleteInvoiceHandler = () => {
    dispatch(actions.invoice.removeInvoiceAsync(id));
    setShowDeleteConfirmation(false);
    history.replace("/invoices");
  };

  const setInvoiceStatusToPaidHandler = () => {
    if (invoice.status !== INVOICE_STATUS.PAID) {
      dispatch(
        actions.invoice.setInvoiceStatusAsync({
          id: id,
          status: INVOICE_STATUS.PAID,
        })
      );
    }
  };

  const showInvoiceForm = () => {
    if (
      viewPortScreenSize === SCREEN_SIZE.MEDIUM ||
      viewPortScreenSize === SCREEN_SIZE.LARGE
    ) {
      setShowSideDrawer(true);
    } else {
      history.push(`/invoices/${id}/edit`);
    }
  };

  const closeSideDrawer = () => {
    setShowSideDrawer(false);
  };

  const submitHandler = (formData) => {
    setShowSideDrawer(false);
    dispatch(actions.invoice.editInvoiceAsync(formData));
  };

  let actionButtons = (
    <Fragment>
      <Button
        label="Edit"
        color={isLightMode ? "light-gray" : "dark-blue"}
        onClick={showInvoiceForm}
      />
      <Button
        label="Delete"
        color="red"
        onClick={showDeleteConfirmationHandler.bind(this, true)}
      />
      {invoice && invoice.status !== INVOICE_STATUS.DRAFT && (
        <Button
          label="Mark as Paid"
          color="violet"
          onClick={setInvoiceStatusToPaidHandler}
        />
      )}
    </Fragment>
  );
  let invoiceActionsBarContent = null;
  let statusContainerActions = null;

  if (viewPortScreenSize === SCREEN_SIZE.SMALL) {
    invoiceActionsBarContent = (
      <InvoiceActionsBar className={classes["actions-bar"]}>
        {actionButtons}
      </InvoiceActionsBar>
    );
  }

  if (
    viewPortScreenSize === SCREEN_SIZE.MEDIUM ||
    viewPortScreenSize === SCREEN_SIZE.LARGE
  ) {
    statusContainerActions = (
      <div className={classes["status-actions"]}>{actionButtons}</div>
    );
  }

  return (
    <section>
      <BackButton label="Go back" to="/invoices" />
      {!invoice ? (
        <p>Invoice Not Found</p>
      ) : (
        <Fragment>
          <div className={allClasses["status-badge-actions-container"]}>
            <div className={classes["status-badge-container"]}>
              <p>Status</p>
              <Badge label={invoice.status} color={badgeColor} />
            </div>
            {statusContainerActions}
          </div>

          <InvoiceDetail invoice={invoice} />
          {invoiceActionsBarContent}

          {showDeleteConfirmation && (
            <Modal>
              <h1 className={allClasses["modal-title"]}>Confirm Deletion</h1>
              <p className={allClasses["modal-message"]}>
                Are you sure you want to delete invoice <InvoiceID id={id} />.
                This action cannot be undone.
              </p>
              <div className={classes["modal-actions"]}>
                <Button
                  label="Cancel"
                  color={isLightMode ? "light-gray" : "dark-blue"}
                  onClick={showDeleteConfirmationHandler.bind(this, false)}
                />
                <Button
                  label="Delete"
                  color="red"
                  onClick={deleteInvoiceHandler}
                />
              </div>
            </Modal>
          )}
        </Fragment>
      )}
      {showSideDrawer && (
        <SideDrawer onBackDropClick={closeSideDrawer}>
          <InvoiceForm
            invoice={invoice}
            isEditing={true}
            onSubmit={submitHandler}
            onCancel={closeSideDrawer}
          />
        </SideDrawer>
      )}
    </section>
  );
};

export default InvoiceDetailPage;
