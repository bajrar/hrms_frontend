import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../../Components/apis/constants/constant';
export const authApiSlice = createApi({
  reducerPath: 'authApiSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    // prepareHeaders: (headers, { getState }) => {
    //   const token = localStorage.getItem('token');
    //   if (token) {
    //     headers.set('Authorization', `Bearer ${token}`);
    //   }
    //   headers.set('Content-Type', 'application/json');
    //   return headers;
    // },
  }),
  endpoints: (builder) => ({
    loginAuth: builder.mutation({
        query: (body) => ({
            url: `users/login`,
            method: 'POST',
            body: body,
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          }),
    }),
  }),
});

export const { useLoginAuthMutation } = authApiSlice;
