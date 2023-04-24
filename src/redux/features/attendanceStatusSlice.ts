import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import getApis from '../../Components/apis/constants/Api';

export const getAttedanceStatus = createAsyncThunk(
  'attendanceStatus/getAttendanceStatus',
  async (data, thunkApi) => {
    try {
      const response = await getApis('attendanceStatus');
      return response.data;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);
interface IAttendanceStatus {
  attendanceStatus: any;
  loading: boolean;
}
const initialState = {
  attendanceStatus: {},
  loading: false,
} as IAttendanceStatus;

const attendanceStatusSlice = createSlice({
  name: 'attendanceStatus',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAttedanceStatus.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAttedanceStatus.fulfilled, (state, action: any) => {
        state.loading = false;
        state.attendanceStatus = action.payload;
      })
      .addCase(getAttedanceStatus.rejected, (state, action) => {
        state.loading = false;
      });
  },
});
export default attendanceStatusSlice.reducer;
