// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../Components/apis/constants/constant';
export const employeeApi = createApi({
  reducerPath: 'employeeApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: (empSn) => `employee/${empSn}`,
    }),
    requestProfileUpdate: builder.mutation({
      query: ({ empSn, ...rest }) => ({
        url: `employee/updateInfoRequestByEmployee/${empSn}`,
        method: 'POST',
        body: rest,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
  }),
});
export const { useGetProfileQuery, useRequestProfileUpdateMutation } = employeeApi;
