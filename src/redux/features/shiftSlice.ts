import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../Components/apis/constants/constant';

export const getShift = createAsyncThunk(
  'shift/getShift',
  async (data, thunkApi) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/shift`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

interface IShift {
  loading: boolean;
  error: string | null;
  data: any;
}
const initialState = {
  loading: false,
  error: '',
  data: {},
} as IShift;

const shiftSlice = createSlice({
  name: 'shift',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getShift.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.data = null;
    });
    builder.addCase(getShift.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.data = action.payload;
    });
    builder.addCase(getShift.rejected, (state: any, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'error';
      state.data = null;
    });
  },
});

export default shiftSlice.reducer;
