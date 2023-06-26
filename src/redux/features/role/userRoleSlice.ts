import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface userRoleState {
  role:String
}

const initialState: userRoleState = {
  role: 'admin',

}

export const userRoleSlice = createSlice({
  name: 'userRole',
  initialState,
  reducers: {
    setRole: (state) => {
      state.role ='admin'
    },

    getRole: (state, action: PayloadAction<string>) => {
      state.role = action.payload
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { setRole, getRole } = userRoleSlice.actions

export default userRoleSlice.reducer