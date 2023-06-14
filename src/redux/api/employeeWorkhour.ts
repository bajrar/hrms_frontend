// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from '../../Components/apis/constants/constant'

// Define a service using a base URL and expected endpoints
export const employeeWorkhourSliceApi = createApi({
  reducerPath: 'employeeWorkhourSliceApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL}),
  endpoints: (builder) => ({
    getAllWorkhours: builder.query({
      query: (userSn) => `getWorkHoursofEmployee/${userSn}`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllWorkhoursQuery } = employeeWorkhourSliceApi