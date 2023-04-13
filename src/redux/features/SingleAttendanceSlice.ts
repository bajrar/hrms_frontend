import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../Components/apis/constants/constant';

export const getEmployeeData = createAsyncThunk(
  'employee/getEmployeeData',
  async (
    {
      userSn,
      startDate,
      endDate,
    }: { userSn: any; startDate?: any; endDate?: any },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.get(
        `${API_URL}/getAttendanceByDateRange?userSn=${userSn}&&startDate=${startDate}&&endDate=${endDate}
        `
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);
interface IAttendance {
  employee: any[];
  loading: boolean;
}

const initialState = {
  employee: [],
  loading: false,
} as IAttendance;

const SingleAttendanceSlice = createSlice({
  name: 'emloyee',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getEmployeeData.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getEmployeeData.fulfilled, (state, action: any) => {
        state.loading = false;
        state.employee = action.payload;
      })
      .addCase(getEmployeeData.rejected, (state, action) => {
        state.loading = false;
      });
  },
});
export default SingleAttendanceSlice.reducer;
