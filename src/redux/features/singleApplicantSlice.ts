import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../Components/apis/constants/constant';

export const getSingleApplicant = createAsyncThunk(
  'singleApplicant/getSingleApplicant',
  async ({ applicantId }: { applicantId: string }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/applicant/${applicantId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
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
