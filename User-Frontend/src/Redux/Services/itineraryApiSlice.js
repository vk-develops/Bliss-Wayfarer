import { ITINERARY_API } from "../constants";
import { apiSlice } from "./apiSlice";

export const itineraryApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAItinerary: builder.query({
            query: ({ id }) => ({
                url: `${ITINERARY_API}/get-a-itinerary/${id}`,
                method: "GET",
                credentials: "include",
            }),
            providesTags: ["Itinerary"],
        }),

        getAllItineraries: builder.query({
            query: () => ({
                url: `${ITINERARY_API}/get-all-itineraries`,
                method: "GET",
                credentials: "include",
            }),
            providesTags: ["Itinerary"],
        }),

        createItinerary: builder.mutation({
            query: (data) => {
                return {
                    url: `${ITINERARY_API}/create-itinerary`,
                    method: "POST",
                    credentials: "include",
                    body: data,
                };
            },
            invalidatesTags: ["Itinerary"],
        }),

        // updateItinerary: builder.mutation({
        //     query: ({ data, id }) => ({
        //         url: `${ITINERARY_API}/update-post/${id}`,
        //         method: "PUT",
        //         credentials: "include",
        //         body: data,
        //     }),
        // }),
        // deleteItinerary: builder.mutation({
        //     query: (id) => ({
        //         url: `${ITINERARY_API}/delete-post/${id}`,
        //         method: "DELETE",
        //         credentials: "include",
        //     }),
        // }),
    }),
    overrideExisting: true,
});

export const {
    useGetAItineraryQuery,
    useGetAllItinerariesQuery,
    useCreateItineraryMutation,
} = itineraryApiSlice;
