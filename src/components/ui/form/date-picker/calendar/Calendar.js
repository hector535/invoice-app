import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import CalendarHeader from "./CalendarHeader";
import CalendarBody from "./CalendarBody";
import utils from "../../../../../utils/utils";
import classes from "./Calendar.module.css";

const Calendar = (props) => {
  const calendarRef = useRef();
  const { isLightMode } = useSelector((state) => state.ui);
  const allClasses = utils.getClassesFromTheme(
    isLightMode,
    classes,
    "calendar"
  );
  const { selectedDate } = props;
  const currentDate = new Date();

  const [selectedMonth, setSelectedMonth] = useState(
    selectedDate ? selectedDate.getMonth() : currentDate.getMonth()
  );
  const [selectedYear, setSelectedYear] = useState(
    selectedDate ? selectedDate.getFullYear() : currentDate.getFullYear()
  );

  const selectedMonthYearHandler = (month, year) => {
    setSelectedMonth(month);
    setSelectedYear(year);
  };

  useEffect(() => {
    calendarRef.current.focus();
  }, []);

  return (
    <div
      tabIndex={0}
      className={allClasses["calendar"]}
      onBlur={props.onBlur}
      ref={calendarRef}
    >
      {/* Year and Month represented in numbers */}
      <CalendarHeader
        year={selectedYear}
        month={selectedMonth}
        onSelectedMonthYear={selectedMonthYearHandler}
      />
      <CalendarBody
        year={selectedYear}
        month={selectedMonth}
        onSelectedDate={props.onSelectedDate}
      />
    </div>
  );
};

export default Calendar;
