import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../Components/apis/constants/constant';

export const getDevices = createAsyncThunk(
  'devices, getDevices',
  async (data, thunkApi) => {
    try {
      const response = await axios.get(`${API_URL}/device`);
      return response.data;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

interface IDevice {
  devices: any[];
  loading: boolean;
}
const initialState = {
  devices: [],
  loading: false,
} as IDevice;

const deviceSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getDevices.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getDevices.fulfilled, (state, action) => {
        state.loading = false;
        state.devices = action?.payload?.device;
      })
      .addCase(getDevices.rejected, (state, action) => {
        state.loading = false;
      });
  },
});
export default deviceSlice.reducer;
