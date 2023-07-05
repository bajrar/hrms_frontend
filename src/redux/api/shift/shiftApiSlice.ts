import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../../Components/apis/constants/constant';

export const shiftApiSlice = createApi({
  reducerPath: 'shiftApiSlice',
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
    getShiftById: builder.query({
      query: ({ shiftId }) => `shift/${shiftId}`,
     
    }),
    getShift: builder.query({
      query: () => `shift`,
     
    }),
  }),
});

export const { useGetShiftByIdQuery ,useGetShiftQuery} = shiftApiSlice;
