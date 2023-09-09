import { Virtuoso } from "react-virtuoso";
import { InvoiceListItem } from "../invoice-list-item/invoice-list-item";
import { InvoiceListProps } from "./invoice-list.type";
import styles from "./invoice-list.module.scss";

export const InvoiceList = (props: InvoiceListProps) => {
  const { invoices, onSelectInvoice } = props;

  return (
    <Virtuoso
      className={styles.invoice_list}
      rowSpan={16}
      data={invoices}
      itemContent={(_, invoice) => (
        <InvoiceListItem
          key={invoice.id}
          invoice={invoice}
          onClick={onSelectInvoice}
        />
      )}
    />
  );
};
