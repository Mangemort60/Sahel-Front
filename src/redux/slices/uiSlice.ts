// uiSlice.js
import { createSlice } from '@reduxjs/toolkit'

interface UiState {
  activeTab: string
  reservationId: string
}

const initialState: UiState = {
  activeTab: 'reservation',
  reservationId: '',
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload
    },
    setReservationId: (state, action) => {
      state.reservationId = action.payload
    },
  },
})

export const { setActiveTab, setReservationId } = uiSlice.actions
export default uiSlice.reducer
