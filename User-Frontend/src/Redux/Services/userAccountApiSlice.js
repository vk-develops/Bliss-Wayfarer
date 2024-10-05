import { ACCOUNT_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const userAccountApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        verifyAccount: builder.mutation({
            query: (data) => ({
                url: `${ACCOUNT_URL}/verify`,
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: data,
            }),
        }),
    }),
});

export const { useVerifyAccountMutation } = userAccountApiSlice;
