import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../Components/apis/constants/constant';

export const getSingleLeave = createAsyncThunk(
  'singleLeave/getSingleLeave',
  async ({ leaveId }: { leaveId: string }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/leave/${leaveId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);
interface ILeave {
  loading: boolean;
  error: string | null;
  leave: any;
}
const initialState = {
  loading: false,
  error: '',
  leave: {},
} as ILeave;

const singleLeaveSlice = createSlice({
  name: 'shift',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSingleLeave.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.leave = null;
    });
    builder.addCase(getSingleLeave.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.leave = action.payload;
    });
    builder.addCase(getSingleLeave.rejected, (state: any, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'error';
      state.data = null;
    });
  },
});

export default singleLeaveSlice.reducer;
