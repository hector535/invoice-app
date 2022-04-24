import React, { useState, useEffect } from "react";
import InvoiceStatusListItem from "./InvoiceStatusListItem";
import { INVOICE_STATUS } from "../../utils/constants";
import classes from "./InvoiceStatusList.module.css";

const initialStatuses = [
  { name: INVOICE_STATUS.DRAFT, value: false },
  { name: INVOICE_STATUS.PENDING, value: false },
  { name: INVOICE_STATUS.PAID, value: false },
];

const InvoiceStatusList = (props) => {
  const [statuses, setStatuses] = useState(initialStatuses);

  const itemChangeHandler = (index, event) => {
    const updatedStatuses = [...statuses];
    const updatedStatus = { ...updatedStatuses[index] };

    updatedStatus.value = event.target.checked;
    updatedStatuses[index] = updatedStatus;

    setStatuses(updatedStatuses);
  };

  const { onFilterChange } = props;

  useEffect(() => {
    onFilterChange(statuses);
  }, [statuses, onFilterChange]);

  const statusesMapped = statuses.map((status, i) => (
    <InvoiceStatusListItem
      key={i}
      index={i}
      label={status.name}
      value={status.value}
      onItemChange={itemChangeHandler}
    />
  ));
  return <ul className={classes["statuses"]}>{statusesMapped}</ul>;
};

export default InvoiceStatusList;
