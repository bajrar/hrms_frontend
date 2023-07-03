// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../Components/apis/constants/constant';

// Define a service using a base URL and expected endpoints
export const leaveSliceApi = createApi({
  reducerPath: 'leaveSliceApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes:['leaves'],
  endpoints: (builder) => ({

    getLeaves: builder.query({
      query: (leave) => `${leave}`,
      providesTags:['leaves']
    }),

    applyLeave: builder.mutation({
      query: (payload) => ({
        url: `leave/apply/${payload.id}`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags:['leaves']
    }),

    updateStatus: builder.mutation({
      query: ({id, ...rest}) => ({
        url: `leave/changeAppliedLeaveStatus/${id}`,
        method: 'POST',
        body: rest
      }),
      invalidatesTags: ['leaves']
    })

    // deleteLeave: builder.mutation({
    //   query: (id) => ({
    //     url: `leave/${id}`,
    //     method: 'DELETE',
    //   }),
    //   invalidatesTags: ['leaves']
    // })

  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetLeavesQuery, useApplyLeaveMutation, useUpdateStatusMutation } = leaveSliceApi;
