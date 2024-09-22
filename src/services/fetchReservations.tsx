import axios from 'axios'
import getApiUrl from '../utils/getApiUrl'

interface Reservation {
  id: string
  reservationType: string
  reservationShortId: string
  city: string
  address: string
  serviceDate: string
  quote: number
  formData: {
    period: string
    numberOfPeople: string
    additionalDetails: string
    sizeRange: string | undefined
    numberOfFloors: string
    beforeOrAfter: string
    fruitBasketSelected: string
  }
  status: string
  bookingStatus: string
  serviceStatus: string
}

const apiUrl = getApiUrl()

export const fetchReservations = async (
  shortID: string,
  setReservations: React.Dispatch<React.SetStateAction<Reservation[]>>,
) => {
  try {
    if (!shortID) {
      console.error('ID utilisateur non disponible')
      return
    }
    const response = await axios.get(`${apiUrl}/mes-reservations`, {
      params: { shortID },
    })
    setReservations(response.data)
    console.log('response', response.data)
  } catch (error) {
    console.error('Erreur lors de la récupération des données', error)
  }
}
