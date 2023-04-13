import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../Components/apis/constants/constant';

export const getUsers = createAsyncThunk(
  'users/getUsers',
  async (data, thunkApi) => {
    try {
      const response = await axios.get(
        `${API_URL}/getEmployeeRecordWithAttendance`
      );
      return response.data;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.message);
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
