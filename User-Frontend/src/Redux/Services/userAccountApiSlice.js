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
        getBookmarkedPosts: builder.query({
            query: () => ({
                url: `${ACCOUNT_URL}/get-bookmarked-posts`,
                method: "GET",
                credentials: "include",
            }),
            providesTags: ["Bookmarks"],
        }),

        getBookmarkedPlaces: builder.query({
            query: () => ({
                url: `${ACCOUNT_URL}/get-bookmarked-places`,
                method: "GET",
                credentials: "include",
            }),
            providesTags: ["Bookmarks"],
        }),
        bookmarkPost: builder.mutation({
            query: (data) => ({
                url: `${ACCOUNT_URL}/bookmark-post`,
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: data,
            }),
            invalidatesTags: ["Bookmarks"],
        }),
        bookmarkPlace: builder.mutation({
            query: (data) => ({
                url: `${ACCOUNT_URL}/bookmark-place`,
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: data,
            }),
            invalidatesTags: ["Bookmarks"],
        }),
    }),
});

export const {
    useVerifyAccountMutation,
    useGetBookmarkedPlacesQuery,
    useGetBookmarkedPostsQuery,
    useBookmarkPlaceMutation,
    useBookmarkPostMutation,
} = userAccountApiSlice;
