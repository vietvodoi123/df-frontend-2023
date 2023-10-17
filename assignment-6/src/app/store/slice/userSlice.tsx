'use client'

import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface IUserState {
  userCurrent?: Auth
}
const initialState: IUserState = {}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, actions: PayloadAction<Auth>) => {
      state.userCurrent = actions.payload
    },
    logout: () => {
      return initialState
    },
  },
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer
