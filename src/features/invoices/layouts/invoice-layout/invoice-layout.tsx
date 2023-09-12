import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../../components";
import styles from "./invoice-layout.module.scss";
import { LoadingView } from "@/components/loading-view/loading-view";

export const InvoiceLayout = () => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <Suspense fallback={<LoadingView text="Loading..." fullscreen />}>
        <Outlet />
      </Suspense>
    </div>
  );
};
