import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../../Components/apis/constants/constant';

export const reportApiSlice = createApi({
  reducerPath: 'reportApiSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMonthlyReport: builder.query({
      query: ({startDate,endDate}) => `attendance/report?from=${startDate}&to=${endDate}`,
     
    }),
  }),
});

export const { useGetMonthlyReportQuery } = reportApiSlice;
