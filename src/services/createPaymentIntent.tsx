// services/createPaymentIntent.ts

import axios from 'axios'
import getApiUrl from '../utils/getApiUrl'

interface PaymentIntentResponse {
  clientSecret: string
}

const createPaymentIntent = async (
  amount: number,
  email: string | null,
  shortId: string,
  name: string,
): Promise<PaymentIntentResponse> => {
  const apiUrl = getApiUrl()

  try {
    // Utilisez axios.post pour envoyer une requête POST
    const response = await axios.post(`${apiUrl}/create-payment`, {
      amount,
      email,
      shortId,
      name,
    })

    // Avec Axios, la réponse est automatiquement traitée et placée dans `response.data`
    return response.data
  } catch (error) {
    console.error('Erreur lors de la création du PaymentIntent', error)
    // Si vous utilisez TypeScript, vous pouvez vouloir vérifier si c'est une erreur Axios pour accéder à `error.response`
    if (axios.isAxiosError(error)) {
      // Vous pouvez ici traiter spécifiquement les erreurs Axios, par exemple :
      console.error('axios error:', error.response?.data)
    }
    throw error
  }
}

export { createPaymentIntent }
