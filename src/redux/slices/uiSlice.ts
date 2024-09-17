// uiSlice.js
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UiState {
  activeTab: string
  reservationId: string
  currentMultiStepForm: number
  redirectPath: string | null
}

const initialState: UiState = {
  activeTab: 'ménage',
  reservationId: '',
  currentMultiStepForm: 1,
  redirectPath: '',
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload
    },
    setReservationId: (state, action: PayloadAction<string>) => {
      state.reservationId = action.payload
    },
    setCurrentMultiStepForm: (state, action: PayloadAction<number>) => {
      state.currentMultiStepForm = action.payload
    },
    setRedirectPath: (state, action: PayloadAction<string | null>) => {
      state.redirectPath = action.payload
    },
    clearRedirectPath: (state) => {
      state.redirectPath = '' // Ou '' si tu préfères une chaîne vide.
    },
    resetUiState: () => ({ ...initialState }),
  },
})

export const {
  setActiveTab,
  setReservationId,
  setCurrentMultiStepForm,
  setRedirectPath,
  clearRedirectPath,
  resetUiState,
} = uiSlice.actions
export default uiSlice.reducer
