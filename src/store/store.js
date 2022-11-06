import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth";
import { votationSlice } from "./votation";
import { resultSlice } from "./result";

export const store = configureStore({
    reducer: {
        votation: votationSlice.reducer,
        auth: authSlice.reducer,
        result: resultSlice.reducer,
    },
})

