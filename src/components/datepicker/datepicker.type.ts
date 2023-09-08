import { ComponentProps } from "react";
import BaseDatePicker from "react-datepicker";

export type DatePickerProps = Omit<
  ComponentProps<typeof BaseDatePicker>,
  "popperClassName" | "calendarClassName"
>;
