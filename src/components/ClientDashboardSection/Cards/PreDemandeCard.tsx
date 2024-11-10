import { IoChatboxOutline } from 'react-icons/io5'
import { Reservation } from '../../../pages/ClientDashboard'
import { Link } from 'react-router-dom'

interface PredemandCardProps {
  reservation: Reservation
}

const PreDemandeCard = ({ reservation }: PredemandCardProps) => (
  <div className="flex rounded-lg h-48 p-4 flex-col justify-between bg-gray-300 hover:bg-gray-200 max-w-sm">
    <h2 className="text-black font-bold text-xl">
      Demande n° {reservation.reservationShortId}
    </h2>
    <p className="text-gray-700">
      Votre demande est en attente de confirmation.
    </p>
    <div>
      <Link
        to={`/client-dashboard/reservationSpace/${reservation.id}`}
        type="button"
        className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
      >
        Acceder au chat <IoChatboxOutline />
      </Link>
    </div>
    {/* Pas d'action pour l'utilisateur */}
  </div>
)

export default PreDemandeCard
