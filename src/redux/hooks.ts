// src/app/hooks.ts
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../redux/store/store'
import { useEffect, useState } from 'react'

// Utilisez tout au long de votre application au lieu de useDispatch et useSelector
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useReservationData = () => {
  const formData = useAppSelector((state) => state.form.formData)
  const bookingFormData = useAppSelector((state) => state.form.bookingFormData)
  const quote = useAppSelector((state) => state.form.quote)
  const serviceDate = useAppSelector((state) => state.form.serviceDate)
  const name = useAppSelector((state) => state.user.name)
  const firstName = useAppSelector((state) => state.user.firstName)
  const shortId = useAppSelector((state) => state.user.shortId)
  const email = useAppSelector((state) => state.user.email)

  // Correctement combinez formData et bookingFormData dans la structure attendue
  const reservationData = {
    formData, // Maintenant formData est un objet imbriqué
    bookingFormData, // bookingFormData est aussi un objet imbriqué
    quote,
    serviceDate,
    name,
    firstName,
    shortId,
    email,
    agent: '',
  }

  return reservationData // Retournez l'objet de données de réservation complet
}

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)

    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}
