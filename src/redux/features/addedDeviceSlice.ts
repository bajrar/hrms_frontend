import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosApiInstance } from '../../Components/apis/constants/ApisService';
// import getApis from '../../Components/apis/constants/Api';

export const getDevices = createAsyncThunk(
  'devices, getDevices',
  async (data, thunkApi) => {
    try {
      const response = await axiosApiInstance('device');
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
