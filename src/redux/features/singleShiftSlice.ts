import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosApiInstance } from '../../Components/apis/constants/ApisService';

export const getSingleShift = createAsyncThunk(
  'singleShift/getSingleShift',
  async ({ shiftId }: { shiftId: string }, { rejectWithValue, getState }) => {
    try {
      const response = await axiosApiInstance(`shift/${shiftId}`);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  },
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

const singleShiftSlice = createSlice({
  name: 'shift',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSingleShift.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.data = null;
    });
    builder.addCase(getSingleShift.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.data = action.payload;
    });
    builder.addCase(getSingleShift.rejected, (state: any, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'error';
      state.data = null;
    });
  },
});

export default singleShiftSlice.reducer;
