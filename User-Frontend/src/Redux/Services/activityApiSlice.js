import { ITINERARY_API } from "../constants";
import { apiSlice } from "./apiSlice";

export const activityApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // getAItinerary: builder.query({
        //     query: ({ id }) => ({
        //         url: `${ITINERARY_API}/get-a-itinerary/${id}`,
        //         method: "GET",
        //         credentials: "include",
        //     }),
        //     providesTags: ["Itinerary"],
        // }),

        // getAllItineraries: builder.query({
        //     query: () => ({
        //         url: `${ITINERARY_API}/get-all-itineraries`,
        //         method: "GET",
        //         credentials: "include",
        //     }),
        //     providesTags: ["Itinerary"],
        // }),

        createActivity: builder.mutation({
            query: ({ data, id, dayNumber }) => {
                console.log(data);
                return {
                    url: `${ITINERARY_API}/itinerary/${id}/days/${dayNumber}/activities`,
                    method: "POST",
                    credentials: "include",
                    body: data,
                };
            },
            invalidatesTags: ["Itinerary"],
        }),

        updateActivity: builder.mutation({
            query: ({ data, id, dayNumber, activityId }) => ({
                url: `${ITINERARY_API}/itinerary/${id}/days/${dayNumber}/activities/${activityId}`,
                method: "PUT",
                credentials: "include",
                body: data,
            }),
            invalidatesTags: ["Itinerary"],
        }),
        deleteActivity: builder.mutation({
            query: ({ id, dayNumber, activityId }) => ({
                url: `${ITINERARY_API}/itinerary/${id}/days/${dayNumber}/activities/${activityId}`,
                method: "DELETE",
                credentials: "include",
            }),
            invalidatesTags: ["Itinerary"],
        }),
    }),
    overrideExisting: true,
});

export const {
    useCreateActivityMutation,
    useUpdateActivityMutation,
    useDeleteActivityMutation,
} = activityApiSlice;
