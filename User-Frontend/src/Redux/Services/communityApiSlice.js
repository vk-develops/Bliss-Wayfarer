import { POST_API } from "../constants";
import { apiSlice } from "./apiSlice";

export const communityApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAPost: builder.query({
            query: ({ id }) => ({
                url: `${POST_API}/get-a-post/${id}`,
                method: "GET",
                credentials: "include",
            }),
        }),

        getAllPosts: builder.query({
            query: ({ limit }) => ({
                url: `${POST_API}/get-all-posts?limit=${limit}`,
                method: "GET",
                credentials: "include",
            }),
        }),

        createPost: builder.mutation({
            query: (data) => ({
                url: `${POST_API}/create-post`,
                method: "POST",
                credentials: "include",
                body: data,
            }),
        }),

        updatePost: builder.mutation({
            query: ({ data, id }) => ({
                url: `${POST_API}/update-post/${id}`,
                method: "PUT",
                credentials: "include",
                body: data,
            }),
        }),
        deletePost: builder.mutation({
            query: (id) => ({
                url: `${POST_API}/delete-post/${id}`,
                method: "DELETE",
                credentials: "include",
            }),
        }),

        getRelatedPosts: builder.query({
            query: () => ({
                url: `${POST_API}/get-related-posts`,
                method: "GET",
                credentials: "include",
            }),
        }),
    }),
    overrideExisting: true,
});

export const {
    useGetAPostQuery,
    useGetAllPostsQuery,
    useGetRelatedPostsQuery,
    useCreatePostMutation,
    useUpdatePostMutation,
    useDeletePostMutation,
} = communityApiSlice;
