import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosApiInstance } from '../../Components/apis/constants/ApisService';

export const getSingleEmployee = createAsyncThunk(
  'employee',
  async ({ employeeId }: { employeeId: string }, { rejectWithValue }) => {

    debugger;
    try {
      const response = await axiosApiInstance(`employee/${employeeId}`);


    
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

interface employeeId {
  loading: boolean;
  error: string | null;
  employee: any;
}

const initialState = {
  loading: false,
  error: '',
  employee: {},
} as employeeId;

const getSingleEmployeeSlice = createSlice({
  name: 'singleEmployee',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSingleEmployee.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.employee = null;
    });
    builder.addCase(getSingleEmployee.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.employee = action.payload;
    });
    builder.addCase(getSingleEmployee.rejected, (state: any, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'error';
      state.data = null;
    });
  },
});

export default getSingleEmployeeSlice.reducer;

