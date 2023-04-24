import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getApis from '../../Components/apis/constants/Api';

export const getJobs = createAsyncThunk(
  'jobs/ getJobs',
  async (data, thunkApi) => {
    try {
      const response = await getApis('jobs');
      return response.data;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);
interface IJobs {
  jobs: any[];
  loading: boolean;
}

const initialState = {
  jobs: [],
  loading: false,
} as IJobs;

const getJobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getJobs.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action?.payload?.jobs;
      })
      .addCase(getJobs.rejected, (state, action) => {
        state.loading = false;
      });
  },
});
export default getJobsSlice.reducer;
