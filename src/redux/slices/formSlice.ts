// src/features/form/formSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface FormState {
  formData: Record<string, any>
  bookingFormData: Record<string, any>
  quote: number | null
  currentStep: string
  isLoading: boolean
  serviceDate: Date | null
  hasCompletedPayment: boolean
}

const initialState: FormState = {
  formData: {},
  bookingFormData: {},
  quote: null,
  currentStep: 'form',
  isLoading: false,
  serviceDate: null,
  hasCompletedPayment: false,
}

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<Record<string, any>>) => {
      state.formData = action.payload
    },
    setBookingFormData: (state, action: PayloadAction<Record<string, any>>) => {
      state.bookingFormData = action.payload
    },
    setQuote: (state, action: PayloadAction<number>) => {
      state.quote = action.payload
    },
    setCurrentStep: (state, action: PayloadAction<string>) => {
      state.currentStep = action.payload
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setServiceDate: (state, action: PayloadAction<Date | null>) => {
      state.serviceDate = action.payload
    },
    setHasCompletedPayment: (state, action: PayloadAction<boolean>) => {
      state.hasCompletedPayment = action.payload
    },
  },
})

export const {
  setFormData,
  setQuote,
  setCurrentStep,
  setIsLoading,
  setServiceDate,
  setBookingFormData,
  setHasCompletedPayment,
} = formSlice.actions

export default formSlice.reducer
