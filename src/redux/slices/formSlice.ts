// src/features/form/formSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface FormState {
  formData: Record<string, any>
  quote: number | null
  isSubmitted: boolean
}

const initialState: FormState = {
  formData: {},
  quote: null,
  isSubmitted: false,
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
    setIsSubmitted: (state, action: PayloadAction<boolean>) => {
      // Action pour mettre à jour isSubmitted
      state.isSubmitted = action.payload
    },
  },
})

export const { setFormData, setQuote, setIsSubmitted } = formSlice.actions

export default formSlice.reducer
