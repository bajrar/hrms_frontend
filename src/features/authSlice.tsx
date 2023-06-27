import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: '',
  isLogined: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getToken: (state, action) => {
      state.token = action.payload;
    },
    login: (state) => {
      state.isLogined = true;
    },
    logout: (state) => {
      state.isLogined = false;
    },
  },
});

export const { getToken, login, logout } = authSlice.actions;

export default authSlice.reducer;
