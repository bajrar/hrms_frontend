// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../Components/apis/constants/constant';
import { TbTarget } from 'react-icons/tb';
export const employeeApi = createApi({
  reducerPath: 'employeeApi',
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
  tagTypes: ['employee'],
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: (empSn) => `employee/${empSn}`,
      providesTags: ['employee'],
    }),
    getEmployee: builder.query({
      query: (status) => ({ url: `employee?onboardingStatus=${status}`, method: 'GET' }),
      providesTags: ['employee'],
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
      invalidatesTags: ['employee'],
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
      invalidatesTags: ['employee'],
    }),
    updateEmployee: builder.mutation({
      query: ({ id, ...rest }) => {
        return {
          url: `employee/${id}`,
          method: 'PATCH',
          body: rest,
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        };
      },
      invalidatesTags: ['employee'],
    }),
    onboardingEmployeeListings: builder.query({
      query: (status) => ({
        url: `employee?onboardingStatus=${status}`,
      }),
      providesTags: ['employee'],
      transformResponse: (response: any, meta, arg) => {
        return response.employee.map((emp: any) => ({
          _id: emp._id,
          employeeId: emp.employeeNumber,
          employeeName: emp.employeeName,
          email: emp.email,
          dateOfJoining: emp.dateOfJoining,
          payroll: emp.payroll,
          status: emp.onboardingStatus,
        }));
      },
    }),
    removeEmployee: builder.mutation({
      query: (id) => ({
        url: `employee/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['employee'],
    }),
  }),
});
export const {
  useGetProfileQuery,
  useGetEmployeeQuery,
  useAddEmployeeMutation,
  useUpdateEmployeeMutation,
  useRemoveEmployeeMutation,
  useRequestProfileUpdateMutation,
  useOnboardingEmployeeListingsQuery,
} = employeeApi;
