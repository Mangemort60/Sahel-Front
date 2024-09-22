import { FaArrowLeft } from 'react-icons/fa'
import ChatBox from './ChatBox'
import { Link, useParams } from 'react-router-dom'
import { Message, Reservation } from '../../pages/ClientDashboard'

interface ReservationSpaceProps {
  messagesByReservation: Record<string, Message[]> // Messages groupés par réservation
  reservations: Reservation[]
}

const ReservationSpace = ({
  messagesByReservation,
  reservations,
}: ReservationSpaceProps) => {
  const { id: reservationId } = useParams<{ id: string }>() // Récupère l'ID de la réservation dans les params

  // Si reservationId est indéfini, tu peux gérer cela ici
  console.log('RESERVATION', reservations)

  if (!reservationId) {
    return <div>Réservation non trouvée.</div>
  }

  // Recherche de la réservation correspondante dans le tableau de réservations
  const reservation = reservations.find((res) => res.id === reservationId)

  // Messages associés à la réservation sélectionnée
  const messages = messagesByReservation[reservationId] || [] // Accéder aux messages de la réservation

  return (
    <div className="h-screen flex flex-col">
      <Link to={'/client-dashboard'}>
        <button className="text-gray-400 mb-8 flex items-center gap-2">
          <FaArrowLeft />
          <p>Retour</p>
        </button>
      </Link>

      <div className="flex gap-4 h-full">
        <div className="h-full bg-slate-50 w-1/3">{reservation?.quote}</div>
        <div className="h-full bg-slate-100 w-2/3">
          <ChatBox reservationId={reservationId} messages={messages} />
        </div>
      </div>
    </div>
  )
}

export default ReservationSpace
