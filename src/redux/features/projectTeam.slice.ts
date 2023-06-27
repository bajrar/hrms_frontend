// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../Components/apis/constants/constant';

export const projectTeamSlice = createApi({
  reducerPath: 'projectTeam',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getProjectTeam: builder.query({
      query: (team) => `/employee/team?projectTeam=${team}`,
    }),
  }),
});

export const { useGetProjectTeamQuery } = projectTeamSlice;
