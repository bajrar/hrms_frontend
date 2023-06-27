import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosApiInstance } from '../../Components/apis/constants/ApisService';

export const getHolidays = createAsyncThunk(
  'holidays/getHolidays',
  async ({ startDate, endDate }: { startDate?: any; endDate?: any }, thunkApi) => {
    try {
      const response = await axiosApiInstance(`holiday/getHolidaysInRange?startDate=${startDate}&&endDate=${endDate}`);
      return response.data;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.message);
    }
  },
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
