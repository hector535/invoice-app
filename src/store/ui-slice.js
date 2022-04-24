import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLightMode: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleMode: (state, action) => {
      state.isLightMode = !state.isLightMode;
    },
  },
});

export default uiSlice;
