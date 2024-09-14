import { useEffect, useState } from 'react'
import axios from 'axios'
import { AlertSuccess } from '../components/common/AlertSuccess'
import { AlertError } from '../components/common/AlertError'
import { useReservationData } from '../redux/hooks'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../redux/hooks'
import { setCurrentStep } from '../redux/slices/formSlice'
import getApiUrl from '../utils/getApiUrl'

type Message = {
  title: string
  description: string
} | null

export const PaymentStatus = () => {
  const [message, setMessage] = useState<Message>({
    title: '',
    description: '',
  })
  const [error, setError] = useState<Message>({ title: '', description: '' })
  const apiUrl = getApiUrl()
  const dispatch = useDispatch()
  const reservationType = useAppSelector((state) => state.form.reservationType)

  // Utilisez le hook personnalisé pour obtenir les données de réservation
  const reservationData = useReservationData()

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const paymentIntentId = urlParams.get('payment_intent')

    if (paymentIntentId) {
      axios
        .post(`${apiUrl}/check-payment-intent`, {
          paymentIntentId,
          reservationData,
          reservationType, // Inclure les données de réservation dans la requête POST
        })
        .then((response) => {
          const { success, message } = response.data

          console.log(response.data)

          if (success) {
            setMessage({
              title: 'Succès',
              description: 'Paiement réussi et réservation créée.',
            })
            setError(null)
            dispatch(setCurrentStep('serviceChoice'))
          } else {
            setError({
              title: 'Erreur',
              description: message || 'Paiement échoué ou en attente.',
            })
            setMessage(null)
          }
        })
        .catch((error) => {
          setError({
            title: 'Erreur',
            description:
              'Erreur lors de la vérification du paiement et de la création de la réservation.',
          })
          setMessage(null)
          console.log(error)
        })
    }
  }, [])

  return (
    <div>
      {message ? (
        <AlertSuccess title={message.title} description={message.description} />
      ) : (
        <AlertError title={error?.title} description={error?.description} />
      )}
    </div>
  )
}

export default PaymentStatus
