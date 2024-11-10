import axios from 'axios'
import getApiUrl from './getApiUrl'

export const createPredemand = async (
  reservationData: object,
  shortId: string,
  email: string | null,
  userName: string,
  userFirstName: string,
  phone: string,
) => {
  const apiUrl = getApiUrl()

  console.log(
    'CREATE PREDEMANDE : USERFIRSTNAME ',
    userFirstName,
    'userName',
    userName,
  )

  try {
    // Faire l'appel API pour créer la pré-demande avec shortId et reservationData
    const response = await axios.post(`${apiUrl}/create-pre-demand`, {
      shortId, // Envoi du shortId ici
      reservationData, // Étendre les données de réservation
      email,
      userName,
      userFirstName,
      phone,
    })

    console.log("Réponse de l'API:", response.data)

    return response.data // Retourner la réponse de l'API
  } catch (error) {
    console.error('Erreur lors de la création de la pré-demande:', error)
    throw error // Renvoyer l'erreur pour la gestion dans le composant appelant
  }
}
