import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Icon, Link } from "@/components";
import { InvoiceForm } from "@/features/invoices";
import { useViewport } from "@/hooks/useViewport";
import { VIEWPORT_WIDTH } from "@/config";
import styles from "./new-invoice.module.scss";

export const NewInvoice = () => {
  const navigate = useNavigate();
  const { vw } = useViewport();

  const handleSaveForm = () => {
    navigate("/invoices");
  };

  useEffect(() => {
    if (vw > VIEWPORT_WIDTH.TABLET) navigate("/invoices");
  }, [vw, navigate]);

  return (
    <main className={styles.main}>
      <div className={styles.wrapper}>
        <Link
          className="container"
          to="/invoices"
          icon={<Icon name="arrow-left" />}
        >
          Go back
        </Link>

        <InvoiceForm onSave={handleSaveForm} />
      </div>
    </main>
  );
};
