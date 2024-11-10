import { Link } from 'react-router-dom'
import { Reservation } from '../../../pages/ClientDashboard'
import { IoChatboxOutline } from 'react-icons/io5'

interface PreDemandePaidCardProps {
  reservation: Reservation
  message: string
}

const PreDemandePaidCard = ({
  reservation,
  message,
}: PreDemandePaidCardProps) => (
  <div className="flex rounded-lg space-y-4 p-8 flex-col justify-between max-w-sm bg-green-300 hover:bg-green-200">
    <h2 className="text-black font-bold text-xl">
      Demande n° {reservation.reservationShortId}
    </h2>
    <h2 className="text-black font-bold text-lg">Frais payés</h2>
    <p>
      {reservation.keyReceived
        ? 'Nous avons bien reçu vos clés, nous allons effectuer la visite et vous transmettre un devis très bientôt '
        : 'En attente de réception des clés'}
    </p>

    <Link
      to={`/client-dashboard/reservationSpace/${reservation.id}`}
      type="button"
      className="p-2 inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-100 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
    >
      Accéder au chat <IoChatboxOutline />
    </Link>
  </div>
)

export default PreDemandePaidCard
