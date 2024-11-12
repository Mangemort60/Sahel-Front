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

  const dispatch = useDispatch()
  const activeTab = useAppSelector((state) => state.ui.activeTab)

  if (!reservationId) {
    return <div>Réservation non trouvée.</div>
  }

  // Recherche de la réservation correspondante dans le tableau de réservations
  const reservation = reservations.find((res) => res.id === reservationId)

  // Messages associés à la réservation sélectionnée
  const messages = messagesByReservation[reservationId] || [] // Accéder aux messages de la réservation

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
    dispatch(
      markUiMessagesAsRead({
        reservationId: reservationId,
      }),
    )

    dispatch(
      updateNotificationCount({
        reservationId: reservationId,
      }),
    )

    dispatch(decrementTotalNotifications())
  }, [reservationId])

  return (
    <div className="h-screen flex flex-col">
      <Link
        to={'/client-dashboard/smallRepairs'}
        onClick={() => dispatch(setActiveTab(activeTab))}
      >
        <button className="text-gray-400 mb-4 flex items-center gap-2">
          <FaArrowLeft />
          <p>Retour</p>
        </button>
      </Link>

      <div className="flex gap-2 h-full  justify-between">
        <div className="border w-1/3 p-4">
          <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
            <li className="pb-3 sm:pb-4">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 truncate dark:text-white">
                    Réservation N°
                  </p>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">
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
                    Service
                  </p>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                    {reservation?.reservationType}
                  </p>
                </div>
              </div>
            </li>
            <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 truncate dark:text-white">
                    Lieu de la prestation
                  </p>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">
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
                    Status de la réservation
                  </p>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                    {reservation?.bookingStatus}
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="h-full w-2/3 flex flex-col justify-between border p-4 ">
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
