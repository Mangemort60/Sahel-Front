// src/features/form/formSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface FormState {
  reservationType: string
  formData: Record<string, any>
  bookingFormData: Record<string, any>
  quote: number | null
  currentStep: string
  isLoading: boolean
  serviceDate: string | null
}

const initialState: FormState = {
  reservationType: '',
  formData: {},
  bookingFormData: {},
  quote: null,
  currentStep: 'serviceChoice',
  isLoading: false,
  serviceDate: null,
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
    setServiceDate: (state, action: PayloadAction<string | null>) => {
      state.serviceDate = action.payload
    },

    setReservationType: (state, action: PayloadAction<string>) => {
      state.reservationType = action.payload
    },
    resetFormState: () => initialState,
  },
})

export const {
  setReservationType,
  setFormData,
  setQuote,
  setCurrentStep,
  setIsLoading,
  setServiceDate,
  setBookingFormData,
  resetFormState,
} = formSlice.actions

export default formSlice.reducer
