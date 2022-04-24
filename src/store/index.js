import { configureStore } from "@reduxjs/toolkit";
import invoiceSlice from "./invoice-slice";
import uiSlice from "./ui-slice";

const store = configureStore({
  reducer: {
    invoice: invoiceSlice.reducer,
    ui: uiSlice.reducer,
  },
});

export default store;
