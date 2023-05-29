import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosApiInstance } from '../../Components/apis/constants/ApisService';

export const getApplicants = createAsyncThunk(
  'applicants/getApplicants',
  async ({pageNumber}:{pageNumber:any}, thunkApi) => {
    try {
      const response = await axiosApiInstance(`applicant?pageNumber=${pageNumber}`);
      return response.data;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

interface IApplicants {
  applicants: any;
  loading: boolean;
}

const initialState = {
  applicants: {},
  loading: false,
} as IApplicants;

const applicantSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getApplicants.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getApplicants.fulfilled, (state, action: any) => {
        state.loading = false;
        state.applicants = action.payload;
      })
      .addCase(getApplicants.rejected, (state, action) => {
        state.loading = false;
      });
  },
});
export default applicantSlice.reducer;
