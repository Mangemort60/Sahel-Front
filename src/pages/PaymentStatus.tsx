import { useEffect, useState } from 'react'
import axios from 'axios'
import { AlertSuccess } from '../components/common/AlertSuccess'
import { AlertError } from '../components/common/AlertError'
import { useReservationData } from '../redux/hooks'
import { createReservation } from '../services/createReservation'

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
  const [reservationCreated, setReservationCreated] = useState(false)
  console.log('PaymentStatus rendered')

  // Utilisez le hook personnalisé pour obtenir les données de réservation
  const reservationData = useReservationData()

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const paymentIntentId = urlParams.get('payment_intent')

    if (!reservationCreated) {
      axios
        .get(`http://localhost:3000/check-payment-intent`, {
          params: { payment_intent: paymentIntentId },
        })
        .then((response) => {
          const { success, message } = response.data

          if (success) {
            setMessage({
              title: 'Succès',
              description: 'Paiement réussi ',
            })
            setError(null)
            console.log('Paiement réussi', message)
            // Redirection ou mise à jour de l'interface utilisateur

            // Création de la réservation si le paiement est réussi
            createReservation(reservationData).then(() => {
              setReservationCreated(true) // Met à jour l'état pour indiquer que la réservation a été créée
            })
          } else {
            setError({
              title: 'Erreur',
              description: 'Paiement échoué ou en attente: ',
            })
            setMessage(null)
            console.error('Paiement échoué ou en attente')
            // Afficher un message d'erreur ou d'attente à l'utilisateur
          }
        })
        .catch((error) => {
          setError({
            title: 'Erreur',
            description: 'Erreur lors de la vérification du paiement ',
          })
          setMessage(null)
          console.error('Erreur lors de la vérification du paiement', error)
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
