import { FaArrowLeft } from 'react-icons/fa'
import ChatBox from './ChatBox'
import { Link, useParams } from 'react-router-dom'
import { Message, Reservation } from '../../pages/ClientDashboard'
import {
  decrementTotalNotifications,
  markUiMessagesAsRead,
  setActiveTab,
  updateNotificationCount,
} from '../../redux/slices/uiSlice'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../redux/hooks/useAppSelector'
import { useEffect } from 'react'
import { markMessagesAsReadByClient } from '../../services/markMessagesAsReadByClient'
import { auth } from '../../../firebase-config'
import { useTranslation } from 'react-i18next'

interface ReservationSpaceProps {
  messagesByReservation: Record<string, Message[]> // Messages groupés par réservation
  reservations: Reservation[]
  updateMessages: (reservationId: string, newMessage: Message) => void
}

const ReservationSpace = ({
  messagesByReservation,
  reservations,
  updateMessages,
}: ReservationSpaceProps) => {
  const { id: reservationId } = useParams<{ id: string }>() // Récupère l'ID de la réservation dans les params

  auth.currentUser?.getIdTokenResult().then((idTokenResult) => {
    console.log('ID TOKEN RESULT', idTokenResult.claims.role) // Vérifiez le rôle ici
  })

  const dispatch = useDispatch()
  const activeTab = useAppSelector((state) => state.ui.activeTab)
  const { t } = useTranslation('clientDashboard')

  if (!reservationId) {
    return <div>{t('space.notFound')}</div>
  }

  const reservation = reservations.find((res) => res.id === reservationId)
  const messages = messagesByReservation[reservationId] || []

  useEffect(() => {
    const markMessagesAsRead = async () => {
      try {
        const data = await markMessagesAsReadByClient(reservationId)
        console.log('Messages marked as read by client:', data)
      } catch (error) {
        console.error('Error marking messages as read:', error)
      }
    }

    markMessagesAsRead()
    dispatch(markUiMessagesAsRead({ reservationId }))
    dispatch(updateNotificationCount({ reservationId }))
    dispatch(decrementTotalNotifications())
  }, [reservationId])

  return (
    <div className="h-screen flex flex-col">
      <Link
        to={'/client-dashboard'}
        onClick={() => dispatch(setActiveTab('ménage'))}
      >
        <button className="text-gray-400 mb-4 flex items-center gap-2">
          <FaArrowLeft />
          <p>{t('space.back')}</p>
        </button>
      </Link>

      <div className="flex gap-2 h-full  justify-between">
        <div className=" w-1/3 p-4 shadow-md hidden sm:flex overflow-hidden">
          <ul className="max-w-md divide-gray-200 dark:divide-gray-700">
            <li className="pb-3 sm:pb-4">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 truncate dark:text-white">
                    {t('space.reservationId')}
                  </p>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-400 whitespace-normal break-words">
                    {reservation?.reservationShortId}
                  </p>
                </div>
              </div>
            </li>
            <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 truncate dark:text-white">
                    {t('space.service')}
                  </p>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-400  whitespace-normal break-words">
                    {t(`space.types.${reservation?.reservationType}`)}{' '}
                  </p>
                </div>
              </div>
            </li>
            <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 truncate dark:text-white">
                    {t('space.location')}
                  </p>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-400  whitespace-normal break-words">
                    {reservation?.address} - {reservation?.city}
                  </p>
                </div>
              </div>
            </li>
            <li className="pt-3 pb-0 sm:pt-4">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 truncate dark:text-white">
                    {t('space.status')}
                  </p>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                    {t(`space.statusLabels.${reservation?.bookingStatus}`)}
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="h-full shadow-md sm:w-2/3 w-full flex flex-col justify-between p-4 ">
          <ChatBox
            reservationId={reservationId}
            messages={messages}
            updateMessages={updateMessages}
            reservation={reservation}
          />
        </div>
      </div>
    </div>
  )
}

export default ReservationSpace
