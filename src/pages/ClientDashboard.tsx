import { Route, Routes } from 'react-router-dom'
import { Content } from '../components/ClientDashboardSection/Content.tsx'
import { ReservationHistory } from '../components/ClientDashboardSection/ReservationHistory.tsx'
import NavbarDashboard from '../components/ClientDashboardSection/NavbarDashboard.tsx'
import Works from '../components/ClientDashboardSection/Works.tsx'
import ReservationSpace from '../components/ClientDashboardSection/ReservationSpace.tsx'
import { fetchReservations } from '../services/fetchReservations.tsx'
import { useEffect, useState } from 'react'
import { useAppSelector } from '../redux/hooks/useAppSelector.ts'
import { fetchAllMessages } from '../services/fetchAllMessages.tsx'

export interface Message {
  sender: string
  clientEmail: string
  text: string
  role: string
  attachments?: { url: string; type: string }[]
  created: string
}

export interface Reservation {
  id: string
  reservationType: string
  reservationShortId: string
  city: string
  address: string
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

export const ClientDashboard = () => {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [messagesByReservation, setMessagesByReservation] = useState<
    Record<string, Message[]>
  >({})
  console.log('Reservation', reservations)

  const shortID = useAppSelector((state) => state.user.shortId)

  // Récupération des réservations
  useEffect(() => {
    if (shortID) {
      fetchReservations(shortID, setReservations)
    }
  }, [shortID])

  // Récupération de tous les messages groupés par reservationId
  useEffect(() => {
    const loadAllMessages = async () => {
      if (shortID) {
        const groupedMessages = await fetchAllMessages(shortID)
        setMessagesByReservation(groupedMessages) // Mettre à jour les messages groupés
      }
    }

    loadAllMessages() // Appel une seule fois
  }, [shortID])

  return (
    <div className="m-4 sm:w-2/3 sm:m-auto space-y-4 h-screen">
      <NavbarDashboard />

      <Routes>
        <Route path="/" element={<Content />}>
          <Route
            index
            path="/"
            element={<ReservationHistory reservations={reservations} />}
          />
          <Route
            path="reservationHistory"
            element={<ReservationHistory reservations={reservations} />}
          />
          <Route
            path="reservationSpace/:id"
            element={
              <ReservationSpace
                messagesByReservation={messagesByReservation}
                reservations={reservations}
              />
            }
          />
          <Route path="works" element={<Works />} />
        </Route>
      </Routes>
    </div>
  )
}
