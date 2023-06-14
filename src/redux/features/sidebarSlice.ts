import { createSlice } from '@reduxjs/toolkit';

const sideBar = createSlice({
  name: 'global',
  initialState: {
    isOpen: true,
  },
  reducers: {
    setOpen: (state) => {
      state.isOpen = true;
    },
    setClose: (state) => {
      state.isOpen = false;
    },
  },
});

export const { setOpen, setClose } = sideBar.actions;

export default sideBar.reducer;
