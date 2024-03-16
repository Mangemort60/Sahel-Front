import axios from 'axios'

type ReservationData = {
  formData: Record<string, any>
  bookingFormData: Record<string, any>
  quote: number | null
  serviceDate: string
}

export const createReservation = async (reservationData: ReservationData) => {
  axios
    .post('http://localhost:3000/reservations', reservationData)
    .then((response) => {
      console.log('Réservation créée avec succès', response.data)
      // Gérez la réussite de la création de réservation, par exemple, en redirigeant l'utilisateur ou en affichant un message de succès
    })
    .catch((error) => {
      console.error('Erreur lors de la création de la réservation', error)
      // Gérez l'erreur de création de réservation
    })
}
