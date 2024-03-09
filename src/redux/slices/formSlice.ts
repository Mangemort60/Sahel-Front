// src/features/form/formSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface FormState {
  formData: Record<string, any>
  quote: number | null
  currentStep: string
  isLoading: boolean
}

const initialState: FormState = {
  formData: {},
  quote: null,
  currentStep: 'form',
  isLoading: false,
}

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<Record<string, any>>) => {
      state.formData = action.payload
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
  },
})

export const { setFormData, setQuote, setCurrentStep, setIsLoading } =
  formSlice.actions

export default formSlice.reducer
