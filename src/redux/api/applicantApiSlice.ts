import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../Components/apis/constants/constant';

export const applicantApiSlice = createApi({
  reducerPath: 'applicantApiSlice',
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
    getApplicants: builder.query({
      query: ({ page }) => `applicant?pageNumber=${page}`,
    }),
    getSingleApplicant: builder.query({
      query: ({ applicantId }) => `applicant/${applicantId}`,
    }),
  }),
});

export const { useGetApplicantsQuery, useGetSingleApplicantQuery } = applicantApiSlice;
