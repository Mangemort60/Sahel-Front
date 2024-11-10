// uiSlice.js
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Interface pour chaque notification de réservation
interface ReservationNotification {
  reservationId: string
  reservationType: string
  notificationCount: number
  unreadMessages: boolean
  pendingServiceFees: boolean
  pendingInvoicePayments: boolean
}

// Interface de l'état pour l'UI
interface UiState {
  activeTab: string
  reservationId: string
  currentMultiStepForm: number
  redirectPath: string | null
  totalNotifications: number | null
  notifDetails: ReservationNotification[]
}

// Initialisation de l'état
const initialState: UiState = {
  activeTab: 'ménage',
  reservationId: '',
  currentMultiStepForm: 1,
  redirectPath: '',
  totalNotifications: null,
  notifDetails: [],
}

// Création du slice avec reducers
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
      state.redirectPath = '' // Réinitialise le chemin de redirection
    },
    setTotalNotifications: (state, action: PayloadAction<number | null>) => {
      state.totalNotifications = action.payload
    },
    setNotificationDetails: (
      state,
      action: PayloadAction<ReservationNotification[]>,
    ) => {
      state.notifDetails = action.payload
    },
    resetUiState: () => ({ ...initialState }), // Réinitialise tout l'état de l'UI
  },
})

// Export des actions et du reducer
export const {
  setActiveTab,
  setReservationId,
  setCurrentMultiStepForm,
  setRedirectPath,
  clearRedirectPath,
  resetUiState,
  setTotalNotifications,
  setNotificationDetails,
} = uiSlice.actions
export default uiSlice.reducer
