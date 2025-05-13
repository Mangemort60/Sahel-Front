import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import dayjs from 'dayjs'

export interface CleaningFormData {
  numberOfFloors: string
  sizeRange: string
  fruitBasketSelected: boolean
  beforeOrAfter: string
  city: string
  address: string
  address2: string
  specialInstructions: string
  phone: string
}

export interface CookingFormData {
  period: string // Période du service (matin, soir, etc.)
  numberOfPeople: string | number // Accepter à la fois chaînes et nombres
  address: string
}

export interface SmallRepairsFormData {
  address: string
  city: string
  urgency: string
  workCategory: string[] // Catégories de travaux
  workDescription: string // Description des travaux
}

interface FormData {
  cleaning?: Partial<CleaningFormData>
  cooking?: Partial<CookingFormData>
  smallRepairs?: Partial<SmallRepairsFormData>
}

interface FormState {
  reservationType: string // 'cleaning', 'cooking', 'smallRepairs'
  formData: FormData // Données du formulaire selon le service sélectionné
  quote: number | null
  currentStep: string
  isLoading: boolean
  serviceStartDate: string | null
}

const initialState: FormState = {
  reservationType: '', // Service actuel (cleaning, cooking, smallRepairs, etc.)
  formData: {},
  quote: null, // Prix du devis
  currentStep: 'serviceChoice', // Étape actuelle dans le processus
  isLoading: false, // Indicateur de chargement
  serviceStartDate: null, // Date de service potentielle
}

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    // Mise à jour du type de réservation (ménage, cuisine, etc.)
    setReservationType: (state, action: PayloadAction<string>) => {
      state.reservationType = action.payload
    },

    // Setter spécifique pour les données du service de ménage (cleaning)
    setCleaningFormData: (
      state,
      action: PayloadAction<Partial<CleaningFormData>>,
    ) => {
      state.formData.cleaning = {
        ...state.formData.cleaning,
        ...action.payload, // Fusionne les nouvelles données avec les anciennes
      }
    },

    // Setter spécifique pour les données du service de cuisine (cooking)
    setCookingFormData: (
      state,
      action: PayloadAction<Partial<CookingFormData>>,
    ) => {
      state.formData.cooking = {
        ...state.formData.cooking,
        ...action.payload, // Fusionne les nouvelles données avec les anciennes
      }
    },

    // Setter spécifique pour les données des petits travaux (smallRepairs)
    setSmallRepairsFormData: (
      state,
      action: PayloadAction<Partial<SmallRepairsFormData>>,
    ) => {
      state.formData.smallRepairs = {
        ...state.formData.smallRepairs,
        ...action.payload, // Fusionne les nouvelles données avec les anciennes
      }
    },

    // Mise à jour du devis après le calcul du prix
    setQuote: (state, action: PayloadAction<number>) => {
      state.quote = action.payload
    },

    // Mise à jour de l'étape actuelle dans le processus
    setCurrentStep: (state, action: PayloadAction<string>) => {
      state.currentStep = action.payload
    },

    // Indicateur de chargement pendant une requête
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },

    // Mise à jour de la date du service
    setServiceStartDate: (state, action: PayloadAction<string | null>) => {
      if (action.payload && dayjs(action.payload).isValid()) {
        state.serviceStartDate = action.payload // Stocke l'ISO 8601 si valide
      } else {
        console.warn('Tentative de stockage d’une date invalide')
        state.serviceStartDate = null // Réinitialise si invalide
      }
    },

    // Réinitialisation de l'état complet du formulaire
    resetFormState: () => initialState,
  },
})

export const {
  setReservationType,
  setCleaningFormData,
  setCookingFormData,
  setSmallRepairsFormData,
  setQuote,
  setCurrentStep,
  setIsLoading,
  setServiceStartDate,
  resetFormState,
} = formSlice.actions

export default formSlice.reducer
