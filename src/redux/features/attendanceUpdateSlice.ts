import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../Components/apis/constants/constant';
export const attendanceRequestSlice = createApi({
  reducerPath: 'attendanceRequestSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  tagTypes: ['patch'],
  endpoints: (builder) => ({
    EmployeeRecordWithAttendance: builder.query({
      query: ({status,date}) => `getEmployeeRecordWithAttendance?status=${status}&date=${date}`,
      // providesTags: ['patch'],
    }),
    getSingleAttendance: builder.query({
      query: ({userSn,startDate,endDate}) => `getAttendanceByDateRange?userSn=${userSn}&&startDate=${startDate}&&endDate=${endDate}`,
      // providesTags: ['patch'],
    }),

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
export const { useGetAttendanceStatusQuery, useRequestAttendanceMutation,useEmployeeRecordWithAttendanceQuery,useGetSingleAttendanceQuery } = attendanceRequestSlice;
