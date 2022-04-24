import invoiceSlice from "../store/invoice-slice";
import * as invoiceSEActions from "./invoice-se";
import uiSlice from "../store/ui-slice";

const actions = {
  invoice: {
    ...invoiceSlice.actions,
    ...invoiceSEActions,
  },
  ui: {
    ...uiSlice.actions,
  },
};

export default actions;
