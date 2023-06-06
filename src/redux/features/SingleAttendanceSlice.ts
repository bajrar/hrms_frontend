import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosApiInstance } from '../../Components/apis/constants/ApisService';

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
    console.log({startDate,endDate})
    try {
      const response = await axiosApiInstance(
        `getAttendanceByDateRange?userSn=${userSn}&&startDate=${startDate}&&endDate=${endDate}`
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
