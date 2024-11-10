import { Reservation } from '../../../pages/ClientDashboard'

interface CancelledCardProps {
  reservation: Reservation
}

const CancelledCard = ({ reservation }: CancelledCardProps) => {
  return (
    <div className="flex rounded-lg h-48 p-8 flex-col bg-red-500 hover:bg-red-400 dark:bg-gray-800">
      <h2 className="text-white dark:text-white font-bold text-xl">
        Demande n° {reservation.reservationShortId}
      </h2>
      <p className="text-white dark:text-gray-300">Réservation annulée.</p>
      <p className="text-white dark:text-gray-300 my-2">
        La demande a été annulée et ne peut plus être modifiée.
      </p>
    </div>
  )
}

export default CancelledCard
