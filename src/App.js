import { Switch, Route, Redirect } from "react-router-dom";
import Layout from "./components/layout/Layout";
import AllInvoicesPage from "./components/pages/AllInvoicesPage";
import InvoiceDetailPage from "./components/pages/InvoiceDetailPage";
import NewInvoicePage from "./components/pages/NewInvoicePage";
import EditInvoicePage from "./components/pages/EditInvoicePage";
import "./App.css";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/invoices" />
        </Route>
        <Route path="/invoices/new">
          <NewInvoicePage />
        </Route>
        <Route path="/invoices/:id/edit">
          <EditInvoicePage />
        </Route>
        <Route path="/invoices/:id">
          <InvoiceDetailPage />
        </Route>
        <Route path="/invoices">
          <AllInvoicesPage />
        </Route>
        <Route path="*">
          <Redirect to="/invoices" />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
