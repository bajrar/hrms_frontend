import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosApiInstance } from '../../Components/apis/constants/ApisService';

export const getAnnouncement = createAsyncThunk('announcement/getAnnouncement', async (data, thunkApi) => {
  try {
    const response = await axiosApiInstance('announcement');
    return response.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.message);
  }
});

interface IAnnouncement {
  announcement: any;
  loading: boolean;
}

const initialState = {
  announcement: {},
  loading: false,
} as IAnnouncement;

const announcementSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAnnouncement.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAnnouncement.fulfilled, (state, action: any) => {
        state.loading = false;
        state.announcement = action.payload;
      })
      .addCase(getAnnouncement.rejected, (state, action) => {
        state.loading = false;
      });
  },
});
export default announcementSlice.reducer;
