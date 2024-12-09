import { Reservation } from '../../../pages/ClientDashboard'

interface CancelledCardProps {
  reservation: Reservation
}

const CancelledCard = ({ reservation }: CancelledCardProps) => {
  return (
    <div className="flex rounded-sm h-auto p-6 flex-col justify-between bg-slate-200 max-w-sm">
      <h2 className="font-bold text-xl">
        Demande n° {reservation.reservationShortId}
      </h2>
      <p className=" dark:text-gray-300">Réservation annulée.</p>
      <p className=" dark:text-gray-300 my-2">
        La demande a été annulée et ne peut plus être modifiée.
      </p>
    </div>
  )
}

export default CancelledCard
