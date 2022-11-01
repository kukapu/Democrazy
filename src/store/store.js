import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth";
import { compareSlice } from "./compare";
import { resultSlice } from "./result";

export const store = configureStore({
    reducer: {
        compare: compareSlice.reducer,
        auth: authSlice.reducer,
        result: resultSlice.reducer,
    },
})

