// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from '../../Components/apis/constants/constant'

// Define a service using a base URL and expected endpoints
export const attendanceByDateApi = createApi({
  reducerPath: 'attendanceByDateApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL}),
  endpoints: (builder) => ({
    getAttendanceByDateRange: builder.query({
      query: ({startDate,endDate,userSn}) => `getAttendanceByDateRange?userSn=${userSn}&&startDate=${startDate}&&endDate=${endDate}`,
    }),
    // applyLeave: builder.mutation({
    //   query: (payload) => ({
    //     url: `leave/apply/${payload.id}`,
    //     method: 'POST',
    //     body: payload,
    //     // headers: {
    //     //   'Content-type': 'application/json; charset=UTF-8',
    //     // },
    //   }),
    // }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAttendanceByDateRangeQuery } = attendanceByDateApi