import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface userRoleState {
  role: String;
  isAdmin: boolean;
}

const initialState: userRoleState = {
  role: 'admin',
  isAdmin: true,
};

export const userRoleSlice = createSlice({
  name: 'userRole',
  initialState,
  reducers: {
    setRole: (state) => {
      state.role = 'admin';
    },
    toggelRole: (state) => {
      state.isAdmin = !state.isAdmin;
    },

    getRole: (state, action: PayloadAction<string>) => {
      state.role = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setRole, getRole, toggelRole } = userRoleSlice.actions;

export default userRoleSlice.reducer;
