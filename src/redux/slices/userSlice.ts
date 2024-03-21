import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  name: string
  firstName: string
  shortId: string
  email: string
  isLoggedIn: boolean
}

const initialState: UserState = {
  name: '',
  firstName: '',
  shortId: '',
  email: '',
  isLoggedIn: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserName: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
    setFirstName: (state, action: PayloadAction<string>) => {
      state.firstName = action.payload
    },
    setShortId: (state, action: PayloadAction<string>) => {
      state.shortId = action.payload
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload
    },
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload
    },
    logout: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload
    },
  },
})

export const {
  setUserName,
  setFirstName,
  logout,
  setShortId,
  setEmail,
  setIsLoggedIn,
} = userSlice.actions

export default userSlice.reducer
