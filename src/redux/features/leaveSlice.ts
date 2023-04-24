import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import getApis from '../../Components/apis/constants/Api';

export const getLeave = createAsyncThunk(
  'leaves/getLeaves',
  async (data, thunkApi) => {
    try {
      const response = await getApis('leave');
      return response.data;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

interface ILeave {
  leaves: any;
  loading: boolean;
}
const initialState = {
  leaves: [],
  loading: false,
} as ILeave;

const leavelice = createSlice({
  name: 'leaves',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getLeave.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getLeave.fulfilled, (state, action: any) => {
        state.loading = false;
        state.leaves = action.payload;
      })
      .addCase(getLeave.rejected, (state, action) => {
        state.loading = false;
      });
  },
});
export default leavelice.reducer;
