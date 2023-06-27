import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosApiInstance } from '../../Components/apis/constants/ApisService';

export const verifyTokenStatus = createAsyncThunk('verifyToken/getVerifyToken', async (data, thunkApi) => {
  try {
    const response = await axiosApiInstance('users/verifyToken');
    return response.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.message);
  }
});
interface IAttendanceStatus {
  tokenData: any;
  loading: boolean;
}
const initialState = {
  tokenData: {},
  loading: false,
} as IAttendanceStatus;

const verifyTokenSlice = createSlice({
  name: 'verifyToken',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(verifyTokenStatus.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(verifyTokenStatus.fulfilled, (state, action: any) => {
        state.loading = false;
        state.tokenData = action.payload;
      })
      .addCase(verifyTokenStatus.rejected, (state, action) => {
        state.loading = false;
      });
  },
});
export default verifyTokenSlice.reducer;
