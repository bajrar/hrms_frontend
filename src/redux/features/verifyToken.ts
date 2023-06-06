import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface VerifyTokenState {
  value: any
}

const initialState: VerifyTokenState = {
  value: {},
}

export const verifyTokenSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    getUserData: (state, action: any) => {
      state.value = action.payload
    },

  },
})

export const { getUserData } = verifyTokenSlice.actions

export default verifyTokenSlice.reducer