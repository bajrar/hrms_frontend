import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  value: any
}

const initialState: CounterState = {
  value: 0,
}

export const userSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    increment: (state) => {

      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
    getUserData: (state, action: any) => {
      state.value = action.payload
    },

  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount,getUserData } = userSlice.actions

export default userSlice.reducer