import { currencyFormatter } from "@/lib/intl-number";
import { stringToDate } from "../../utils/date";

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  year: "numeric",
  month: "short",
  day: "2-digit",
});

export const toCurrency = (num: number) => currencyFormatter.format(num);

export const toPaymentDate = (date: string) =>
  dateFormatter.format(stringToDate(date));
