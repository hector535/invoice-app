import React from "react";
import { useSelector } from "react-redux";
import { ReactComponent as LeftArrowIcon } from "../../../../../assets/icon-arrow-left.svg";
import { ReactComponent as RightArrowIcon } from "../../../../../assets/icon-arrow-right.svg";
import utils from "../../../../../utils/utils";
import classes from "./CalendarHeader.module.css";

const CalendarHeader = (props) => {
  const { year, month } = props;
  const { isLightMode } = useSelector((state) => state.ui);
  const allClasses = utils.getClassesFromTheme(
    isLightMode,
    classes,
    "month-year"
  );
  const monthName = new Date(year, month, 1).toLocaleString("default", {
    month: "short",
  });

  const arrowClickedHandler = (month) => {
    let updatedYear = year;

    if (month < 0) {
      month = 11;
      updatedYear--;
    } else if (month > 11) {
      month = 0;
      updatedYear++;
    }

    props.onSelectedMonthYear(month, updatedYear);
  };

  return (
    <div className={classes["container"]}>
      <LeftArrowIcon
        className={classes["icon"]}
        onClick={arrowClickedHandler.bind(this, month - 1)}
      />
      <p className={allClasses["month-year"]}>
        {monthName} {year}
      </p>
      <RightArrowIcon
        className={classes["icon"]}
        onClick={arrowClickedHandler.bind(this, month + 1)}
      />
    </div>
  );
};

export default CalendarHeader;
