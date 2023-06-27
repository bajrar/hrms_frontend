import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosApiInstance } from '../../Components/apis/constants/ApisService';

export const getUpcomingEvents = createAsyncThunk('upcomingEvents/getUpcomingEvents', async (data, thunkApi) => {
  try {
    const response = await axiosApiInstance('event/upcoming');
    return response.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.message);
  }
});

interface IUpcomingEvents {
  upcomingEvents: any;
  loading: boolean;
}

const initialState = {
  upcomingEvents: {},
  loading: false,
} as IUpcomingEvents;

const upcomingEventSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getUpcomingEvents.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getUpcomingEvents.fulfilled, (state, action: any) => {
        state.loading = false;
        state.upcomingEvents = action.payload;
      })
      .addCase(getUpcomingEvents.rejected, (state, action) => {
        state.loading = false;
      });
  },
});
export default upcomingEventSlice.reducer;
