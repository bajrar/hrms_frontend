import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosApiInstance } from '../../Components/apis/constants/ApisService';

export const getUsers = createAsyncThunk(
  'users/getUsers',
  async ({ status }: { status: any }, { rejectWithValue }) => {
    try {
      const response = await axiosApiInstance(
        `getEmployeeRecordWithAttendance?status=${status}`
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

interface IAttendance {
  user: any[];
  loading: boolean;
}

const initialState = {
  user: [],
  loading: false,
} as IAttendance;

const attendanceSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getUsers.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getUsers.fulfilled, (state, action: any) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
      });
  },
});
export default attendanceSlice.reducer;
