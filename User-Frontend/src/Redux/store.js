import { configureStore } from "@reduxjs/toolkit";
import usersAuthSlice from "./Features/usersAuthSlice";
import { apiSlice } from "./Services/apiSlice";

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: usersAuthSlice,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: false,
});

export default store;
