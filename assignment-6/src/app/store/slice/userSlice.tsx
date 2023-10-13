'use client'

import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface IUserState {
  userCurrent?: UserData
}
const initialState: IUserState = {}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, actions: PayloadAction<UserData>) => {
      state.userCurrent = actions.payload
    },
    logout: () => {
      return initialState
    },
  },
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer
