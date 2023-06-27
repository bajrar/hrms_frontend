import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosApiInstance } from '../../Components/apis/constants/ApisService';

export const getSingleJob = createAsyncThunk(
  'singleJob/getSingleJob',
  async ({ jobId }: { jobId: string }, { rejectWithValue }) => {
    try {
      const response = await axiosApiInstance(`jobs/${jobId}`);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  },
);
interface IJob {
  loading: boolean;
  error: string | null;
  job: any;
}

const initialState = {
  loading: false,
  error: '',
  job: {},
} as IJob;

const getSingleJobSlice = createSlice({
  name: 'singleJob',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSingleJob.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.job = null;
    });
    builder.addCase(getSingleJob.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.job = action.payload;
    });
    builder.addCase(getSingleJob.rejected, (state: any, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'error';
      state.data = null;
    });
  },
});

export default getSingleJobSlice.reducer;
