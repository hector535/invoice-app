const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  year: "numeric",
  month: "short",
  day: "2-digit",
});

export const toCurrency = (num: number) => currencyFormatter.format(num);

export const toPaymentDate = (date: string) => {
  const [year, month, day] = date.split("-");
  const convertedDate = new Date(+year, +month - 1, +day);

  return dateFormatter.format(convertedDate);
};
