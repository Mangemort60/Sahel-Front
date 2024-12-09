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
    updateNotificationCount: (
      state,
      action: PayloadAction<{ reservationId: string }>,
    ) => {
      const { reservationId } = action.payload
      const notification = state.notifDetails.find(
        (notif) => notif.reservationId === reservationId,
      )
      if (notification && notification.notificationCount > 0) {
        notification.notificationCount -= 1
      }
    },

    decrementTotalNotifications: (state) => {
      if (state.totalNotifications && state.totalNotifications > 0) {
        state.totalNotifications -= 1
      }
    },
    markUiMessagesAsRead: (
      state,
      action: PayloadAction<{ reservationId: string }>,
    ) => {
      const { reservationId } = action.payload
      const notification = state.notifDetails.find(
        (notif) => notif.reservationId === reservationId,
      )
      if (notification) {
        notification.unreadMessages = false
      }
    },
    setPendingServiceFees: (
      state,
      action: PayloadAction<{ reservationId: string; value: boolean }>,
    ) => {
      const { reservationId, value } = action.payload
      const notification = state.notifDetails.find(
        (notif) => notif.reservationId === reservationId,
      )
      if (notification) {
        notification.pendingServiceFees = value
      }
    },
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
  updateNotificationCount,
  decrementTotalNotifications,
  markUiMessagesAsRead,
  setPendingServiceFees,
} = uiSlice.actions
export default uiSlice.reducer
