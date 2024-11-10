// src/services/notificationService.js
import axios from 'axios'
import getApiUrl from '../utils/getApiUrl'
import { store } from '../redux/store/store' // Assurez-vous que store est bien exporté dans votre fichier de configuration Redux
import {
  setTotalNotifications,
  setNotificationDetails,
} from '../redux/slices/uiSlice'

export const fetchBadgeStatus = async (userId: string) => {
  try {
    const apiUrl = getApiUrl()
    const response = await axios.get(
      `${apiUrl}/users/${userId}/detailed-badge-status`,
    )
    const data = response.data

    console.log('badgeStatus', data)

    // Utilisation de store.dispatch directement
    store.dispatch(setTotalNotifications(data.totalNotifications))

    if (data.notifDetails && Array.isArray(data.notifDetails)) {
      store.dispatch(setNotificationDetails(data.notifDetails))
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des notifications:', error)
    throw error
  }
}
