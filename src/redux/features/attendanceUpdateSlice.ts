import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../Components/apis/constants/constant';
export const attendanceRequestSlice = createApi({
  reducerPath: 'attendanceRequestSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  tagTypes: ['patch'],
  endpoints: (builder) => ({
    getAttendanceStatus: builder.query({
      query: () => '/attendanceStatus',
      providesTags: ['patch'],
    }),
    requestAttendance: builder.mutation({
      query: (payload) => ({
        url: '/attendance/updateAttendance',
        method: 'PATCH',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['patch'],
    }),
  }),
});
export const { useGetAttendanceStatusQuery, useRequestAttendanceMutation } = attendanceRequestSlice;
