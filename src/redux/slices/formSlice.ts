// src/features/form/formSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface FormState {
  formData: Record<string, any>
  bookingFormData: Record<string, any>
  quote: number | null
  currentStep: string
  isLoading: boolean
  serviceDate: string
}

const initialState: FormState = {
  formData: {},
  bookingFormData: {},
  quote: null,
  currentStep: 'form',
  isLoading: false,
  serviceDate: '',
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
      // Action pour mettre à jour isSubmitted
      state.currentStep = action.payload
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setServiceDate: (state, action: PayloadAction<string>) => {
      state.serviceDate = action.payload
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
} = formSlice.actions

export default formSlice.reducer
