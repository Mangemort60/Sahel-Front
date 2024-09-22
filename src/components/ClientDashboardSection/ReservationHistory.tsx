import { useEffect, useState } from 'react'
import { useAppSelector } from '../../redux/hooks/useAppSelector'
import { Link } from 'react-router-dom'
import { Reservation } from '../../pages/ClientDashboard'

interface ReservationHistoryProps {
  reservations: Reservation[] // Le type de données que tu passes en tant que props
}

type StatusColorMap = {
  [key: string]: string
  'à venir': 'text-blue-500'
  'en cours': 'text-green-500'
  terminée: 'text-gray-500'
  suspendue: 'text-red-500'
}

// Interface pour un message
interface Message {
  reservationId: string
  text: string
  created: string
  role: string
  readByClient: boolean
}

type NewMessagesType = {
  [reservationId: string]: number
}

export const ReservationHistory = ({
  reservations,
}: ReservationHistoryProps) => {
  const [newMessages, setNewMessages] = useState<NewMessagesType>({})
  const activeTab = useAppSelector((state) => state.ui.activeTab)
  const [_isLoading, setIsLoading] = useState(true)
  const [_error, setError] = useState('')

  console.log('activeTab:', activeTab)
  console.log(
    'reservationType:',
    reservations.map((r) => r.reservationType),
  )

  function getTabColorClasses(activeTab: string): string {
    const colorMap: { [key: string]: string } = {
      cuisine: 'bg-sahelPurpleTeal hover:bg-sahelPurpleTealDarker',
      ménage: 'bg-sahelBlueTeal hover:bg-sahelBlueTealDarker',
      works: 'bg-sahelFlashBlue hover:bg-sahelFlashBlueDarker',
    }
    // Si activeTab existe dans colorMap, retourne la classe correspondante. Sinon, retourne une valeur par défaut.
    return colorMap[activeTab] || 'bg-gray-200 hover:bg-gray-300'
  }

  useEffect(() => {
    // const fetchNewMessages = async () => {
    //   try {
    //     const response = await axios.get<Message[]>(`${apiUrl}/new-messages`)
    //     console.log('API Response:', response.data) // Ajout d'un log pour voir la réponse de l'API
    //     const messages = response.data.reduce<NewMessagesType>(
    //       (acc, message) => {
    //         console.log('Processing message:', message)
    //         if (
    //           !message.readByClient &&
    //           (message.role === 'Admin' || message.role === 'superAdmin')
    //         ) {
    //           if (!acc[message.reservationId]) {
    //             acc[message.reservationId] = 0
    //           }
    //           acc[message.reservationId]++
    //         }
    //         return acc
    //       },
    //       {},
    //     )
    //     console.log('Processed Messages:', messages) // Ajout d'un log pour voir les messages traités
    //     setNewMessages(messages)
    //   } catch (error) {
    //     console.error('Error fetching new messages:', error)
    //   }
    // }
    // fetchNewMessages()
    // const interval = setInterval(fetchNewMessages, 10000) // Polling toutes les 10 secondes
    // return () => clearInterval(interval)
  }, [])

  return (
    <div>
      <>
        <div className="flex sm:flex-wrap sm:flex-row flex-col gap-4 m-auto">
          {reservations
            .filter((reservation) => reservation.reservationType === activeTab)
            .map((reservation, index) => (
              <Link
                to={`reservationSpace/${reservation.id}`}
                className="transition transform hover:scale-105  max-w-sm"
              >
                <div
                  className={`flex rounded-lg h-full dark:bg-gray-800 ${getTabColorClasses(activeTab)} p-8 flex-col`}
                >
                  <div className="flex items-center mb-3">
                    <h2 className="text-white dark:text-white font-bold text-xl">
                      Réservation n°{' '}
                      <span className=" text-base font-thin">
                        {' '}
                        {reservation.reservationShortId}
                      </span>
                    </h2>
                  </div>
                  <div className="flex flex-col justify-between flex-grow">
                    <p className="text-white dark:text-gray-300">
                      Montant : {reservation.quote}€
                    </p>
                    <p className="text-white dark:text-gray-300 mb-2">
                      Intervention prévue le : {reservation.serviceDate}
                    </p>
                    <hr className="border" />
                    <p className="text-white dark:text-gray-300 mt-2">
                      Adresse : {reservation.address}
                    </p>
                    <p className="text-white dark:text-gray-300">
                      Ville : {reservation.city}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </>
    </div>
  )
}
