import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../Components/apis/constants/constant';

export const tokenSliceApi = createApi({
  reducerPath: 'tokenSliceApi',
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
    getTokenData: builder.query({
      query: () => `users/verifyToken`,
    }),
  }),
});

export const { useGetTokenDataQuery } = tokenSliceApi;
