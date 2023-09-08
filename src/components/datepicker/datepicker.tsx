import BaseDatePicker from "react-datepicker";
import clsx from "clsx";
import { Icon } from "../icon/icon";
import { DatePickerProps } from "./datepicker.type";
import styles from "./datepicker.module.scss";

export const DatePicker = (props: DatePickerProps) => {
  const { className, ...restProps } = props;

  return (
    <label className={clsx(styles.wrapper, className)}>
      <BaseDatePicker
        {...restProps}
        popperClassName={styles.popper}
        calendarClassName={styles.calendar}
        className="input_field"
      />
      <Icon name="calendar" className={styles.calendar_icon} />
    </label>
  );
};
