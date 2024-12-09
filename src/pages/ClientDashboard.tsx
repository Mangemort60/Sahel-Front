import { Route, Routes } from 'react-router-dom'
import { Content } from '../components/ClientDashboardSection/Content.tsx'
import { ReservationHistory } from '../components/ClientDashboardSection/ReservationHistory.tsx'
import NavbarDashboard from '../components/ClientDashboardSection/NavbarDashboard.tsx'
import ReservationSpace from '../components/ClientDashboardSection/ReservationSpace.tsx'
import { fetchReservations } from '../services/fetchReservations.tsx'
import { useEffect, useState } from 'react'
import { useAppSelector } from '../redux/hooks/useAppSelector.ts'
import { fetchAllMessages } from '../services/fetchAllMessages.tsx'
import SmallRepairs from '../components/ClientDashboardSection/SmallRepairs.tsx'

export interface Devis {
  id: string // ID unique du devis
  url: string // URL du devis (lien vers le fichier)
  amount: number // Montant du devis
  note: string
  status: string // Statut du devis (ex: 'en attente d'acceptation')
  paymentStatus: string // Statut de paiement (ex: 'en attente de paiement', 'payé')
  createdAt: string // Date de création du devis (format ISO 8601 ou autre format valide)
  validUntil: string // Date jusqu'à laquelle le devis est valide (format ISO 8601)
  report: string
}

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
  devis: Devis[] // Tableau de devis  city: string
  address: string
  serviceDate: string
  city: string
  email: string
  shortId: string
  name: string
  firstName: string
  quote: number
  finalReportUrl: string
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
  paymentStatus: string
  initialClientSecret: string
  keyReceived: boolean
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

  // Fonction pour mettre à jour les messages pour une réservation donnée
  const updateMessages = (reservationId: string, newMessage: Message) => {
    setMessagesByReservation((prevMessages) => ({
      ...prevMessages,
      [reservationId]: [...(prevMessages[reservationId] || []), newMessage],
    }))
  }

  return (
    <div className="m-4 sm:w-2/3 sm:m-auto space-y-4 min-h-screen">
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
                updateMessages={updateMessages}
              />
            }
          />
          <Route
            path="smallRepairs"
            element={<SmallRepairs reservations={reservations} />}
          />
        </Route>
      </Routes>
    </div>
  )
}
