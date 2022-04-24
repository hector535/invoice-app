import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ReactComponent as ArrowDownIcon } from "../../assets/icon-arrow-down.svg";
import InvoiceStatusList from "./InvoiceStatusList";
import utils from "../../utils/utils";
import { SCREEN_SIZE } from "../../utils/constants";
import classes from "./InvoiceStatusFilter.module.css";

const InvoiceStatusFilter = (props) => {
  const { isLightMode } = useSelector((state) => state.ui);
  const [toggleFilter, setToggleFilter] = useState(false);
  const viewportScreenSize = utils.getViewPortScreenSize();
  const allClasses = utils.getClassesFromTheme(
    isLightMode,
    classes,
    "label",
    "status-container"
  );
  let filterLabel = "Filter";

  if (
    viewportScreenSize === SCREEN_SIZE.MEDIUM ||
    viewportScreenSize === SCREEN_SIZE.LARGE
  ) {
    filterLabel = "Filter by status";
  }

  const toggleFilterHandler = () => {
    setToggleFilter((prevState) => !prevState);
  };

  return (
    <div className={classes["container"]}>
      <button className={classes["btn"]} onClick={toggleFilterHandler}>
        <span className={allClasses["label"]}>{filterLabel}</span>
        {toggleFilter ? (
          <ArrowDownIcon className={classes["arrow-icon"]} viewBox="0 0 11 7" />
        ) : (
          <ArrowDownIcon viewBox="0 0 11 7" />
        )}
      </button>
      {toggleFilter && (
        <div className={allClasses["status-container"]}>
          <InvoiceStatusList onFilterChange={props.onFilterChange} />
        </div>
      )}
    </div>
  );
};

export default InvoiceStatusFilter;
