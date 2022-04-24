import React, { Fragment } from "react";
import InvoiceStatusFilter from "./InvoiceStatusFilter";
import { ReactComponent as PlusIcon } from "../../assets/icon-plus.svg";
import utils from "../../utils/utils";
import { SCREEN_SIZE } from "../../utils/constants";
import classes from "./InvoicesActionsBar.module.css";

const InvoicesActionsBar = (props) => {
  const viewportScreenSize = utils.getViewPortScreenSize();
  let buttonLabel = "New";

  if (
    viewportScreenSize === SCREEN_SIZE.MEDIUM ||
    viewportScreenSize === SCREEN_SIZE.LARGE
  ) {
    buttonLabel = "New Invoice";
  }
  return (
    <Fragment>
      <InvoiceStatusFilter onFilterChange={props.onFilterChange} />
      <button className={classes["btn"]} onClick={props.onNewInvoice}>
        <div className={classes["plus-icon-container"]}>
          <PlusIcon className={classes["plus-icon"]} viewBox="0 0 11 11" />
        </div>
        {buttonLabel}
      </button>
    </Fragment>
  );
};

export default InvoicesActionsBar;
