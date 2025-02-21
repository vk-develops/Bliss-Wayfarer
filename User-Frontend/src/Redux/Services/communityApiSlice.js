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
            query: ({ limit, lastPostId }) => ({
                url: `${POST_API}/get-all-posts?limit=${limit}${
                    lastPostId ? `&lastPostId=${lastPostId}` : ""
                }`,
                method: "GET",
                credentials: "include",
            }),
        }),

        createPost: builder.mutation({
            query: (data) => {
                console.log("Sending data to server:", data); // Debugging log
                return {
                    url: `${POST_API}/create-post`,
                    method: "POST",
                    credentials: "include",
                    body: data, // No need to set Content-Type manually
                };
            },
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

        gemSearch: builder.query({
            query: ({ location, limit = 3, page = 1 }) => ({
                url: `${POST_API}/gem-search?location=${location}&limit=${limit}&page=${page}`,
                method: "GET",
                credentials: "include",
            }),
        }),
        peopleSearch: builder.query({
            query: ({ query }) => ({
                url: `${POST_API}/people-search?query=${query}`,
                method: "GET",
                credentials: "include",
            }),
        }),
        postsSearch: builder.query({
            query: ({ location, limit = 3, page = 1 }) => ({
                url: `${POST_API}/posts-search?location=${location}&limit=${limit}&page=${page}`,
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
    useGemSearchQuery,
    usePeopleSearchQuery,
    usePostsSearchQuery,
} = communityApiSlice;
