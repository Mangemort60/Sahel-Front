import axios from 'axios'
import getApiUrl from '../utils/getApiUrl'
import { Reservation } from '../pages/ClientDashboard'

const apiUrl = getApiUrl()

export const fetchReservations = async (
  shortID: string,
  setReservations: React.Dispatch<React.SetStateAction<Reservation[]>>,
) => {
  try {
    if (!shortID) {
      console.error('ID utilisateur non disponible')
      setReservations([]) // Définit un tableau vide si l'ID est absent
      return
    }
    const response = await axios.get(`${apiUrl}/mes-reservations`, {
      params: { shortID },
    })
    setReservations(response.data || []) // Définit un tableau vide si la réponse est vide
    console.log('response', response.data)
  } catch (error) {
    console.error('Erreur lors de la récupération des données', error)
    setReservations([]) // Définit un tableau vide en cas d'erreur
  }
}
