import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../store/store'

// Sélecteurs individuels pour accéder aux morceaux d'état
const selectCurrentMultiStepForm = (state: RootState) =>
  state.ui.currentMultiStepForm
const selectReservationType = (state: RootState) => state.form.reservationType

// Sélecteur combiné qui vérifie les trois conditions
export const selectIsReadyForPredemande = createSelector(
  [selectCurrentMultiStepForm, selectReservationType],
  (currentStep, reservationType) =>
    currentStep === 4 && reservationType === 'petits-travaux',
)
