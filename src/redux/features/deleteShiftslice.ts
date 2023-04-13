import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../Components/apis/constants/constant';

export const deleteShift = createAsyncThunk('shift/deleteShift', async () => {
  try {
    const response = await axios.delete(`${API_URL}/shift`);
    // If you want to get something back
    return response.data;
  } catch (err) {
    console.error(err);
  }
});

const deleteShiftSlice = createSlice({
  name: 'shift',
  initialState: {
    loading: false,
    error: '',
    data: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteShift.pending, (state) => {
        state.loading = true;
        state.error = 'null';
        state.data = null;
      })
      .addCase(deleteShift.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        state.data = action.payload;
      })
      .addCase(deleteShift.rejected, (state, action) => {
        state.loading = false;
        state.error = 'Failed to post shift';
        state.data = null;
      });
  },
});

export default deleteShiftSlice.reducer;
