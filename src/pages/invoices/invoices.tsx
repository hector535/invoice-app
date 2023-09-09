import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Icon, Button } from "@/components";
import { Filter, InvoiceList, invoices } from "@/features/invoices";
import {
  extractQueryStringValues,
  filterInvoices,
  getViewportSize,
} from "./invoices.utils";
import { VIEWPORT_WIDTH } from "@/config";
import styles from "./invoices.module.scss";

export const Invoices = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [openFilter, setOpenFilter] = useState(false);
  const { draft, paid, pending } = extractQueryStringValues(searchParams);
  const [filterOptions, setFilterOptions] = useState({ draft, paid, pending });
  const filteredInvoices = filterInvoices(invoices, { draft, paid, pending });

  const handleBtnClick = () => {
    const { vw } = getViewportSize();

    if (vw >= VIEWPORT_WIDTH.TABLET) {
      console.log("open drawer");
    } else {
      console.log("redirect to new form page");
    }
  };

  const handleFilterChanges = (name: string, value: boolean) =>
    setFilterOptions({
      ...filterOptions,
      [name]: value,
    });

  useEffect(() => {
    setFilterOptions({ draft, paid, pending });
  }, [draft, paid, pending, setFilterOptions]);

  useEffect(() => {
    const { draft, paid, pending } = filterOptions;

    navigate(`/invoices?draft=${draft}&pending=${pending}&paid=${paid}`);
  }, [filterOptions, navigate]);

  return (
    <main className={styles.page}>
      <div className={styles.toolbar}>
        <div>
          <h1 className={styles.title}>Invoices</h1>
          <p>{filteredInvoices.length} total invoices</p>
        </div>

        <Filter
          options={filterOptions}
          open={openFilter}
          onClick={setOpenFilter}
          onChange={handleFilterChanges}
        />

        <Button
          onClick={handleBtnClick}
          icon={
            <div className={styles.circle}>
              <Icon name="plus" />
            </div>
          }
        >
          <span className={styles.button_text}></span>
        </Button>
      </div>

      <InvoiceList invoices={filteredInvoices} onSelectInvoice={console.log} />
    </main>
  );
};
