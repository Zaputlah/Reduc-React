// src/store/store.js

import { configureStore } from "@reduxjs/toolkit";
import barangReducer from "../features/barangSlice";

export const store = configureStore({
    reducer: {
        barang: barangReducer,
    },
});
