import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../Components/apis/constants/constant';

export const getHolidays = createAsyncThunk(
  'holidays/getHolidays',
  async (data, thunkApi) => {
    try {
      const response = await axios.get(`${API_URL}/holiday`);
      return response.data;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

interface IHolidays {
  holidays: any;
  loading: boolean;
}
const initialState = {
  holidays: [],
  loading: false,
} as IHolidays;

const holidaySlice = createSlice({
  name: 'holidays',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getHolidays.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getHolidays.fulfilled, (state, action: any) => {
        state.loading = false;
        state.holidays = action.payload;
      })
      .addCase(getHolidays.rejected, (state, action) => {
        state.loading = false;
      });
  },
});
export default holidaySlice.reducer;
