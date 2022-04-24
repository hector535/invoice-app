import React, { useState } from "react";
import { useSelector } from "react-redux";
import Calendar from "./calendar/Calendar";
import utils from "../../../../utils/utils";
import classes from "./DatePicker.module.css";

const DatePicker = (props) => {
  const { label, className, value, error } = props;
  const { hasError, message: errorMessage } = error;
  const [showCalendar, setShowCalendar] = useState(false);
  const { isLightMode } = useSelector((state) => state.ui);
  const allClasses = utils.getClassesFromTheme(
    isLightMode,
    classes,
    "label",
    "date-picker-identifier"
  );

  const containerClasses = `${classes["container"]} ${className}`;
  let inputValue = "";
  let selectedDate = null;

  if (value) {
    selectedDate = new Date(value);
    inputValue = selectedDate.toLocaleDateString();
  }

  const toggleCalendarHandler = () => {
    setShowCalendar((prevState) => !prevState);
  };

  const selectedDateHandler = (selectedDate) => {
    if (props.onChange) {
      const event = {
        target: {
          value: selectedDate,
        },
      };
      toggleCalendarHandler();
      props.onChange(event);
    }
  };

  const blurHandler = (event) => {
    const parent = event.currentTarget;
    const child = event.relatedTarget;

    if (!utils.contains(parent, child)) {
      if (child) {
        if (child.className !== allClasses["date-picker-identifier"]) {
          toggleCalendarHandler();
        }
      } else {
        toggleCalendarHandler();
      }

      if (props.onBlur) {
        props.onBlur();
      }
    }
  };

  return (
    <div className={containerClasses}>
      <p className={allClasses["label"]}>{label}</p>
      <div className={classes["date-picker"]}>
        <input
          className={allClasses["date-picker-identifier"]}
          type="text"
          readOnly
          value={inputValue}
          onClick={toggleCalendarHandler}
        />

        {showCalendar && (
          <Calendar
            value={selectedDate}
            onSelectedDate={selectedDateHandler}
            onBlur={blurHandler}
          />
        )}
      </div>
      {hasError && <p className={classes["error"]}>{errorMessage}</p>}
    </div>
  );
};

export default DatePicker;
