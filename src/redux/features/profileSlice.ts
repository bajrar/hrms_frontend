// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../Components/apis/constants/constant';
export const profileSlice = createApi({
  reducerPath: 'profileSlice',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: () => `employee`,
      // query: (userSn) => `employee/${userSn}`,
    }),
    requestProfileUpdate: builder.mutation({
      query: ({ userSn, ...rest }) => ({
        url: `employee/updateInfoRequestByEmployee/${userSn}`,
        method: 'POST',
        body: rest,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
  }),
});
export const { useGetUserProfileQuery, useRequestProfileUpdateMutation } = profileSlice;
