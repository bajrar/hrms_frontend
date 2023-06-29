// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../Components/apis/constants/constant';
export const employeeApi = createApi({
  reducerPath: 'employeeApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL,    prepareHeaders: (headers, { getState }) => {
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    headers.set('Content-Type', 'application/json');
    return headers;
  }, }),
  tagTypes:['employee'],
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: (empSn) => `employee/${empSn}`,
    }),
    getEmployee: builder.query({
      query: () => `employee`,
      providesTags:['employee']
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
      invalidatesTags:['employee']
    }),
    addEmployee: builder.mutation({
      query: (body) => ({
        url: `employee`,
        method: 'POST',
        body: body,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
  }),
});
export const { useGetProfileQuery, useRequestProfileUpdateMutation, useAddEmployeeMutation ,useGetEmployeeQuery} = employeeApi;
