import axios from 'axios'
import { Message } from '../pages/ClientDashboard'
import getApiUrl from '../utils/getApiUrl'

// Fonction pour récupérer tous les messages d'un utilisateur
export const fetchAllMessages = async (
  userId: string,
): Promise<Record<string, Message[]>> => {
  const apiUrl = getApiUrl()
  try {
    // Appel à l'API pour récupérer tous les messages d'un utilisateur
    const response = await axios.get<Record<string, Message[]>>(
      `${apiUrl}/reservations/${userId}/messages`,
    )
    return response.data // L'API renvoie des messages groupés par reservationId
  } catch (error) {
    console.error('Error fetching all messages:', error)
    return {} // Retourner un objet vide en cas d'erreur
  }
}
