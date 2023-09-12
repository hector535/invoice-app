import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Icon, Link } from "@/components";
import { InvoiceForm, useGetInvoiceById } from "@/features/invoices";
import { useViewport } from "@/hooks/useViewport";
import { VIEWPORT_WIDTH } from "@/config";
import styles from "./edit-invoice.module.scss";

export const EditInvoice = () => {
  const navigate = useNavigate();
  const { invoiceId } = useParams();
  const { invoice } = useGetInvoiceById(invoiceId!);
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

        <InvoiceForm defaultValues={invoice} onSave={handleSaveForm} />
      </div>
    </main>
  );
};
