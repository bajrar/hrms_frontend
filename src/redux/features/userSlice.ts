import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
  value: any
}

const initialState: UserState = {
  value: {},
}

export const userSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    getUserData: (state, action: PayloadAction) => {
      state.value = action.payload
    },  
  },
})

export const { getUserData } = userSlice.actions

export default userSlice.reducer