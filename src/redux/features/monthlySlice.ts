// import { message } from 'antd';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosApiInstance } from '../../Components/apis/constants/ApisService';

export const getMonthlyLeave = createAsyncThunk(
  'monthlyReport/getMonthlyReport',
  async ({ startDate, endDate }: { startDate?: any; endDate?: any }, { rejectWithValue }) => {
    try {
      const response = await axiosApiInstance(`attendance/report?from=${startDate}&to=${endDate}`);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  },
);

interface IMonthlyReport {
  reports: any;
  loading: boolean;
}

const initialState = {
  reports: [],
  loading: false,
} as IMonthlyReport;

const monthlyReportSlice = createSlice({
  name: 'monthlyReport',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getMonthlyLeave.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getMonthlyLeave.fulfilled, (state, action: any) => {
        state.loading = false;
        state.reports = action.payload;
      })
      .addCase(getMonthlyLeave.rejected, (state, action) => {
        state.loading = false;
      });
  },
});
export default monthlyReportSlice.reducer;
