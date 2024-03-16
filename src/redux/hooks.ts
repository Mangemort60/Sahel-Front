// src/app/hooks.ts
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../redux/store/store'

// Utilisez tout au long de votre application au lieu de useDispatch et useSelector
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useReservationData = () => {
  const formData = useAppSelector((state) => state.form.formData)
  const bookingFormData = useAppSelector((state) => state.form.bookingFormData)
  const quote = useAppSelector((state) => state.form.quote)
  const serviceDate = useAppSelector((state) => state.form.serviceDate)

  // Correctement combinez formData et bookingFormData dans la structure attendue
  const reservationData = {
    formData, // Maintenant formData est un objet imbriqué
    bookingFormData, // bookingFormData est aussi un objet imbriqué
    quote,
    serviceDate,
  }

  return reservationData // Retournez l'objet de données de réservation complet
}
