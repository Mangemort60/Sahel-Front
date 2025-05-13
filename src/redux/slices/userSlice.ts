import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  name: string
  firstName: string
  shortId: string
  email: string
  isLoggedIn: boolean
  role: string
  phone: string
  paymentCompleted: boolean // ✅ ajout ici
}

const initialState: UserState = {
  name: '',
  firstName: '',
  shortId: '',
  email: '',
  isLoggedIn: false,
  role: '',
  phone: '',
  paymentCompleted: false, // ✅ valeur par défaut
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
    setRole: (state, action: PayloadAction<string>) => {
      state.role = action.payload
    },
    setPhone: (state, action: PayloadAction<string>) => {
      state.phone = action.payload
    },
    setPaymentCompleted: (state, action: PayloadAction<boolean>) => {
      state.paymentCompleted = action.payload
    },
    resetUserState: () => initialState,
  },
})

export const {
  setUserName,
  setFirstName,
  logout,
  setShortId,
  setEmail,
  setIsLoggedIn,
  setRole,
  setPhone,
  setPaymentCompleted, // ✅ exporté
} = userSlice.actions

export default userSlice.reducer
