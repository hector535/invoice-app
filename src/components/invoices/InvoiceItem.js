import React from "react";
import { useSelector } from "react-redux";
import InvoiceID from "./InvoiceID";
import Badge from "../ui/Badge";
import utils from "../../utils/utils";
import classes from "./InvoiceItem.module.css";

const InvoiceItem = (props) => {
  const { isLightMode } = useSelector((state) => state.ui);
  const { id, client, due, total, status } = props;
  const dueDate = utils.toDate(due);
  const day = dueDate.getDate();
  const month = dueDate.toLocaleString("en-us", { month: "short" });
  const year = dueDate.getFullYear();
  const allClasses = utils.getClassesFromTheme(
    isLightMode,
    classes,
    "item",
    "due",
    "client",
    "amount"
  );

  let badgeColor = utils.getBadgeColor(status);

  return (
    <li
      className={allClasses["item"]}
      onClick={props.onItemClick.bind(this, id)}
    >
      <InvoiceID id={id} className={classes["id"]} />
      <p className={allClasses["client"]}>{client}</p>
      <p className={allClasses["due"]}>Due {`${day} ${month} ${year}`}</p>
      <p className={allClasses["amount"]}>£ {total.toFixed(2)}</p>
      <Badge label={status} color={badgeColor} className={classes["badge"]} />
    </li>
  );
};

export default InvoiceItem;
