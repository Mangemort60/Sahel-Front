import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAppSelector } from '../../redux/hooks'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '../../redux/hooks'
import getApiUrl from '../../utils/getApiUrl'

type StatusColorMap = {
  [key: string]: string
  'à venir': 'text-blue-500'
  'en cours': 'text-green-500'
  terminée: 'text-gray-500'
  suspendue: 'text-red-500'
}

interface Reservation {
  id: string
  reservationType: string
  reservationShortId: string
  bookingFormData: {
    city: string
    address: string
  }
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

type ColorMap = {
  [key: string]: string
}

export const ReservationHistory = () => {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [newMessages, setNewMessages] = useState<NewMessagesType>({})
  const activeTab = useAppSelector((state) => state.ui.activeTab)

  console.log('newMessages:', newMessages)

  const dispatch = useAppDispatch()
  const apiUrl = getApiUrl()

  const statusColorMap: StatusColorMap = {
    'à venir': 'text-blue-500',
    'en cours': 'text-green-500',
    terminée: 'text-gray-500',
    suspendue: 'text-red-500',
  }

  const [_isLoading, setIsLoading] = useState(true)
  const [_error, setError] = useState('')

  const shortID = useAppSelector((state) => state.user.shortId)

  function getTabColorClasses(activeTab: string): string {
    const colorMap: { [key: string]: string } = {
      cuisine: 'bg-sahelPurpleTeal hover:bg-sahelPurpleTealDarker',
      ménage: 'bg-sahelBlueTeal hover:bg-sahelBlueTealDarker',
      works: 'bg-sahelFlashBlue hover:bg-sahelFlashBlueDarker',
    }

    // Si activeTab existe dans colorMap, retourne la classe correspondante. Sinon, retourne une valeur par défaut.
    return colorMap[activeTab] || 'bg-gray-200 hover:bg-gray-300'
  }

  // const formatSizeRange = (sizeRange: string | undefined) => {
  //   switch (sizeRange) {
  //     case 'lessThan40':
  //       return 'Moins de 40m²'
  //     case 'from40to80':
  //       return 'Entre 40m² et 80m²'
  //     case 'from80to120':
  //       return 'Entre 80m² et 120m²'
  //     case 'moreThan120':
  //       return 'Plus de 120m²'
  //     default:
  //       return sizeRange
  //   }
  // }

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

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        if (!shortID) {
          console.error('ID utilisateur non disponible')
          return
        }
        const response = await axios.get(`${apiUrl}/mes-reservations`, {
          params: { shortID },
        })
        setReservations(response.data)
      } catch (error) {
        console.error('Erreur lors de la récupération des données', error)
      }
    }

    const fetchNewMessages = async () => {
      try {
        const response = await axios.get<Message[]>(`${apiUrl}/new-messages`)
        console.log('API Response:', response.data) // Ajout d'un log pour voir la réponse de l'API
        const messages = response.data.reduce<NewMessagesType>(
          (acc, message) => {
            console.log('Processing message:', message)
            if (
              !message.readByClient &&
              (message.role === 'Admin' || message.role === 'superAdmin')
            ) {
              if (!acc[message.reservationId]) {
                acc[message.reservationId] = 0
              }
              acc[message.reservationId]++
            }
            return acc
          },
          {},
        )
        console.log('Processed Messages:', messages) // Ajout d'un log pour voir les messages traités
        setNewMessages(messages)
      } catch (error) {
        console.error('Error fetching new messages:', error)
      }
    }
    fetchReservations()
    fetchNewMessages()
    const interval = setInterval(fetchNewMessages, 10000) // Polling toutes les 10 secondes
    return () => clearInterval(interval)
  }, [shortID])

  return (
    <div>
      <>
        <div className="flex sm:flex-wrap sm:flex-row flex-col gap-4 m-auto">
          {reservations
            .filter((reservation) => reservation.reservationType === activeTab)
            .map((reservation, index) => (
              <Link
                to=""
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
                      Adresse : {reservation.bookingFormData.address}
                    </p>
                    <p className="text-white dark:text-gray-300">
                      Ville : {reservation.bookingFormData.city}
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
