import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { API_URL } from "../../Components/apis/constants/constant";

export const eventSliceApi = createApi({
    reducerPath: 'eventSliceApi',
    baseQuery: fetchBaseQuery({baseUrl: API_URL}),
    tagTypes:['events'],
    endpoints: (builder) => ({
        getUpcomingEvents:builder.query({
      query: () => `event/upcoming`,
      providesTags:['events']
        }),
        
        addUpcomingEvent: builder.mutation({
            query: (body) => ({
                url: `event`,
                method: 'POST',
                body: body,
                headers: { 'Content-Type': 'application/json; charset=utf-8' }
            }),
            invalidatesTags:['events']
        })
    })
})

export const {useAddUpcomingEventMutation,useGetUpcomingEventsQuery} = eventSliceApi;