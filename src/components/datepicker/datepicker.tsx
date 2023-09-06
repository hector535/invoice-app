import { ComponentProps } from "react";
import BaseDatePicker from "react-datepicker";
import styles from "./datepicker.module.scss";
import { Icon } from "../icon/icon";

type DatePickerProps = Omit<
  ComponentProps<typeof BaseDatePicker>,
  "className" | "popperClassName" | "calendarClassName"
>;

export const DatePicker = (props: DatePickerProps) => {
  return (
    <label className={styles.wrapper}>
      <BaseDatePicker
        {...props}
        popperClassName={styles.popper}
        calendarClassName={styles.calendar}
        className="input_field"
      />
      <Icon name="calendar" className={styles.calendar_icon} />
    </label>
  );
};
