import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../../Components/apis/constants/constant';

export const dashboardSliceApi = createApi({
  reducerPath: 'dashboardSliceApi',
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
    getDashboard: builder.query({
      query: () => `dashboard`,
     
    }),
  }),
});

export const { useGetDashboardQuery } = dashboardSliceApi;
