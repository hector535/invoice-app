import React from "react";
import { useSelector } from "react-redux";
import utils from "../../../../../utils/utils";
import classes from "./CalendarBody.module.css";

const CalendarBody = (props) => {
  const { year, month } = props;
  const { isLightMode } = useSelector((state) => state.ui);
  const allClasses = utils.getClassesFromTheme(
    isLightMode,
    classes,
    "calendar-day",
    "calendar-day--disabled"
  );

  const calendarDayClickedHandler = (event) => {
    const day = +event.target.innerText;
    const selectedDate = new Date(year, month, day).toLocaleDateString("en-us");
    props.onSelectedDate(selectedDate);
  };

  const daysOfCurrentMonth = new Date(year, month + 1, 0).getDate();
  const daysOfLastMonth = new Date(year, month, 0).getDate();
  const startDayOfWeek = new Date(year, month, 1).getDay();

  const className = `${allClasses["calendar-day"]} ${allClasses["calendar-day--disabled"]}`;

  const dayLastMonth = daysOfLastMonth - startDayOfWeek;
  let content = [];

  //Insert days of last month
  for (let i = dayLastMonth; i < daysOfLastMonth; i++) {
    const button = (
      <button
        type="button"
        className={className}
        key={i + "last_month"}
        disabled
      >
        {i + 1}
      </button>
    );
    content.push(button);
  }

  //Insert days of current month
  for (let i = 0; i < daysOfCurrentMonth; i++) {
    const button = (
      <button
        type="button"
        className={allClasses["calendar-day"]}
        key={i + "current_month"}
        onClick={calendarDayClickedHandler}
      >
        {i + 1}
      </button>
    );
    content.push(button);
  }

  //Insert days of next month
  if (content.length % 7 !== 0) {
    for (let i = daysOfCurrentMonth + 1; content.length % 7 !== 0; i++) {
      const button = (
        <button
          type="button"
          className={className}
          key={i + "next_month"}
          disabled
        >
          {i - daysOfCurrentMonth}
        </button>
      );
      content.push(button);
    }
  }

  return <div className={classes["container"]}>{content}</div>;
};

export default CalendarBody;
