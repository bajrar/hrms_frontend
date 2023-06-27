import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  value: any;
  userDetails: any;
}

const initialState: UserState = {
  value: {},
  userDetails: {},
};

export const userSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    getUserData: (state, action: PayloadAction) => {
      state.value = action.payload;
    },
    getUserDetails: (state, action: PayloadAction) => {
      state.userDetails = action.payload;
    },
  },
});

export const { getUserData, getUserDetails } = userSlice.actions;

export default userSlice.reducer;
