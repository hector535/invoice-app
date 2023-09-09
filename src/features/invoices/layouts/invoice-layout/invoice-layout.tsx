import { Outlet } from "react-router-dom";
import { Header } from "../../components";
import styles from "./invoice-layout.module.scss";

export const InvoiceLayout = () => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <Outlet />
    </div>
  );
};
