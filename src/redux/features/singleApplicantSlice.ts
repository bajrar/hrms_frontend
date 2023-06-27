import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosApiInstance } from '../../Components/apis/constants/ApisService';

export const getSingleApplicant = createAsyncThunk(
  'singleApplicant/getSingleApplicant',
  async ({ applicantId }: { applicantId: string }, { rejectWithValue }) => {
    try {
      const response = await axiosApiInstance(`applicant/${applicantId}`);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  },
);

interface IApplicants {
  applicant: any;
  loading: boolean;
}

const initialState = {
  applicant: {},
  loading: false,
} as IApplicants;

const singleApplicantSlice = createSlice({
  name: 'singleApplicant',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getSingleApplicant.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getSingleApplicant.fulfilled, (state, action: any) => {
        state.loading = false;
        state.applicant = action.payload;
      })
      .addCase(getSingleApplicant.rejected, (state, action) => {
        state.loading = false;
      });
  },
});
export default singleApplicantSlice.reducer;
