import axios from 'axios'
import getApiUrl from '../utils/getApiUrl'

export const markMessagesAsReadByClient = async (reservationId: string) => {
  const API_BASE_URL = getApiUrl()

  try {
    const response = await axios.put(
      `${API_BASE_URL}/reservations/${reservationId}/messages/read-by-client`,
    )
    console.log('Messages marked as read by client:', response.data)
    return response.data
  } catch (error) {
    console.error('Error marking messages as read:', error)
    throw error
  }
}
