import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import getApiUrl from '../../utils/getApiUrl'
import { useAppSelector } from '../../redux/hooks/useAppSelector'

interface Reservation {
  id: string
  bookingStatus: string
  chatStatus: boolean
  createdAt: string
  email: string
  serviceDate: string
  emails: {
    confirmationEmailSent: boolean
    defaultInstructionsEmailSent: boolean
    instructionsKeysEmailSent: boolean
  }
  reservationShortId: string
  reservationType: string
  shortId: string
  smallRepairs: {
    address: string
    city: string
    urgency: string
    workCategory: string[]
    workDescription: string
  }
}

type NewMessagesType = {
  [reservationId: string]: number
}

interface Message {
  reservationId: string
  text: string
  created: string
  role: string
  readByClient: boolean
}

const Works = () => {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [newMessages, setNewMessages] = useState<NewMessagesType>({})
  const shortID = useAppSelector((state) => state.user.shortId)
  const apiUrl = getApiUrl()

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        if (!shortID) {
          console.error('ID utilisateur non disponible')
          return
        }
        const response = await axios.get(`${apiUrl}/mes-reservations`, {
          params: { shortID, reservationType: 'petits-travaux' },
        })

        setReservations(
          response.data.filter(
            (reservation: Reservation) =>
              reservation.reservationType === 'petits-travaux',
          ),
        )
      } catch (error) {
        console.error('Erreur lors de la récupération des données', error)
      }
    }

    const fetchNewMessages = async () => {
      try {
        const response = await axios.get<Message[]>(`${apiUrl}/new-messages`)
        console.log('API Response:', response.data)

        const messages = response.data.reduce<NewMessagesType>(
          (acc, message) => {
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
        setNewMessages(messages)
      } catch (error) {
        console.error('Error fetching new messages:', error)
      }
    }

    fetchReservations()
    fetchNewMessages()
    const interval = setInterval(fetchNewMessages, 600000) // Polling toutes les 10 minutes
    return () => clearInterval(interval)
  }, [shortID, apiUrl])

  return (
    <>
      <div className="flex flex-wrap gap-4">
        {reservations.length > 0 ? (
          reservations.map((reservation) => (
            <Link
              key={reservation.id}
              to={`/Client-dashboard/reservationSpace/${reservation.id}`}
              className="transition transform hover:scale-105 max-w-sm"
            >
              <div className="flex rounded-lg hover:bg-slate-500 h-full dark:bg-gray-800 bg-slate-400 p-8 flex-col">
                <div className="flex items-center mb-3">
                  <h2 className="text-white dark:text-white font-bold text-xl">
                    {reservation.bookingStatus === 'pré-demande' &&
                      'Pré-demande'}{' '}
                    n° {reservation.reservationShortId}
                  </h2>
                </div>
                <div className="flex flex-col justify-between flex-grow">
                  <p className="text-white dark:text-gray-300">
                    Type de travaux : {reservation.smallRepairs.workCategory}
                  </p>
                  <p className="text-white dark:text-gray-300 mb-2">
                    Intervention prévue :{' '}
                    {reservation.serviceDate || 'à définir'}
                  </p>
                  <hr className="border" />
                  <p className="text-white dark:text-gray-300 mt-2">
                    Adresse : {reservation.smallRepairs.address},{' '}
                    {reservation.smallRepairs.city}
                  </p>
                  <p className="text-white dark:text-gray-300">
                    Statut : {reservation.bookingStatus}
                  </p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-white">Aucune réservation trouvée.</p>
        )}
      </div>
    </>
  )
}

export default Works
