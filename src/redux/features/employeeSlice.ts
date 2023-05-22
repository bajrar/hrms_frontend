import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosApiInstance } from '../../Components/apis/constants/ApisService';

export const getEmployee = createAsyncThunk(
  'employee',
  async (data, thunkApi) => {
    try {
      const response = await axiosApiInstance('employee');
      return response.data;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

interface IEmployee {
  employee: any;
  loading: boolean;
}

const initialState = {
  employee: [],
  loading: false,
} as IEmployee;

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getEmployee.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getEmployee.fulfilled, (state, action: any) => {
        state.loading = false;
        state.employee = action.payload;
      })
      .addCase(getEmployee.rejected, (state, action) => {
        state.loading = false;
      });
  },
});
export default employeeSlice.reducer;
